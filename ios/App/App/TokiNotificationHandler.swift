import WebKit
import UserNotifications

class TokiNotificationHandler: NSObject {
    static let shared = TokiNotificationHandler()
    private override init() { super.init() }
}

// ── 接收來自 JS 的訊息 ──────────────────────────────────────────
extension TokiNotificationHandler: WKScriptMessageHandler {

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard
            let body   = message.body as? [String: Any],
            let action = body["action"] as? String
        else { return }

        switch action {
        case "schedule":
            scheduleNotification(body)
        case "cancelAll":
            let center = UNUserNotificationCenter.current()
            center.removeAllPendingNotificationRequests()
            center.removeAllDeliveredNotifications()
        default:
            break
        }
    }

    private func scheduleNotification(_ body: [String: Any]) {
        guard
            let id       = body["id"]    as? String,
            let title    = body["title"] as? String,
            let bodyText = body["body"]  as? String
        else { return }

        let delay = (body["delay"] as? Double) ?? 1.0

        let content       = UNMutableNotificationContent()
        content.title     = title
        content.body      = bodyText
        content.sound     = .default

        let trigger = UNTimeIntervalNotificationTrigger(
            timeInterval: max(1, delay),
            repeats: false
        )
        let request = UNNotificationRequest(
            identifier: id,
            content:    content,
            trigger:    trigger
        )

        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: [id])
        center.add(request)
    }
}

// ── App 在前景時仍顯示通知 ──────────────────────────────────────
extension TokiNotificationHandler: UNUserNotificationCenterDelegate {

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler:
            @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound])
    }
}
