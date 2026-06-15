import UIKit
import Capacitor
import WebKit
import UserNotifications
import AVFoundation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {

        // Background music should follow the device's silent switch and mix with other audio.
        do {
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.ambient, mode: .default)
            try audioSession.setActive(true)
        } catch {
            print("Failed to configure audio session: \(error)")
        }

        // ── 要求通知權限 ──
        let center = UNUserNotificationCenter.current()
        center.delegate = TokiNotificationHandler.shared
        center.requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }

        // ── 等 WebView 載入完成後注入 toki message handler ──
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            self.injectTokiBridge()
        }

        return true
    }

    // ── 找到 WKWebView 並注入 handler ──
    private func injectTokiBridge() {
        guard let webView = findWebView(in: window?.rootViewController?.view) else {
            // WebView 還沒準備好，再等一秒
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                self.injectTokiBridge()
            }
            return
        }
        // 避免重複加入
        let controller = webView.configuration.userContentController
        controller.removeScriptMessageHandler(forName: "toki")
        controller.add(TokiNotificationHandler.shared, name: "toki")
    }

    private func findWebView(in view: UIView?) -> WKWebView? {
        guard let view = view else { return nil }
        if let wk = view as? WKWebView { return wk }
        for sub in view.subviews {
            if let found = findWebView(in: sub) { return found }
        }
        return nil
    }

    // ── App 進前景時清掉已送達的通知 badge ──
    func applicationDidBecomeActive(_ application: UIApplication) {
        application.applicationIconBadgeNumber = 0
        UNUserNotificationCenter.current().removeAllDeliveredNotifications()
    }

    func applicationWillResignActive(_ application: UIApplication) {}
    func applicationDidEnterBackground(_ application: UIApplication) {}
    func applicationWillEnterForeground(_ application: UIApplication) {}
    func applicationWillTerminate(_ application: UIApplication) {}

    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(
        _ application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
    ) -> Bool {
        return ApplicationDelegateProxy.shared.application(
            application,
            continue: userActivity,
            restorationHandler: restorationHandler
        )
    }
}
