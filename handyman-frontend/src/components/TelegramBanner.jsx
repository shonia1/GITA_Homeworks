// src/components/TelegramBanner.jsx
import { useAuth } from "../hooks/useAuth";

const TelegramBanner = () => {
  const { user } = useAuth();

  // Show only for craftsmen who haven't linked Telegram yet
  if (!user || user.role !== "craftsman" || user.telegramChatId) {
    return null;
  }

  const botUsername =
    import.meta.env.VITE_TELEGRAM_BOT_USERNAME || "YourBotUsername";
  const link = `https://t.me/${botUsername}?start=userId=${user.id}`;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">📱</span>
        <div>
          <p className="font-semibold text-lg">
            გსურთ ახალი დავალებები მიიღოთ ტელეგრამით?
          </p>
          <p className="text-sm text-blue-100">
            მიიღეთ შეტყობინებები პირდაპირ Telegram-ზე, როცა გამოჩნდება თქვენი
            პროფესიის შესაბამისი დავალება.
          </p>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
      >
        <span>🔗</span> დაკავშირება
      </a>
    </div>
  );
};

export default TelegramBanner;
