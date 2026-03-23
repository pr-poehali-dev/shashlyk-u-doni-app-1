import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3605f624-aa80-47f5-adf9-894f0efd8fb2/files/ed040472-dbf5-482f-8534-b13fd1e176d6.jpg";

const MENU = [
  // Шашлык в лаваше
  { id: 1, name: "Сердца куриные", desc: "Зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 480, weight: "400г", emoji: "🍗", category: "Шашлык в лаваше" },
  { id: 2, name: "Мякоть баранины", desc: "Зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 600, weight: "420г", emoji: "🍖", category: "Шашлык в лаваше" },
  { id: 3, name: "Джигар", desc: "Печень баранья в жиру, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 550, weight: "400г", emoji: "🥩", category: "Шашлык в лаваше" },
  { id: 4, name: "Филе бедра куриное", desc: "Зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 550, weight: "440г", emoji: "🍗", category: "Шашлык в лаваше" },
  { id: 5, name: "Веган", desc: "Зелень, лук, грибы, кетчуп", price: 350, weight: "220г", emoji: "🥦", category: "Шашлык в лаваше" },
  // Шашлык на углях
  { id: 6, name: "Каре из баранины", desc: "На углях", price: 750, weight: "220г", emoji: "🍖", category: "Шашлык на углях" },
  { id: 7, name: "Ребро мендаль (баранина)", desc: "На углях", price: 650, weight: "200г", emoji: "🍖", category: "Шашлык на углях" },
  { id: 8, name: "Мякоть баранины", desc: "На углях", price: 500, weight: "180г", emoji: "🥩", category: "Шашлык на углях" },
  { id: 9, name: "Джигар (печень баранья в жиру)", desc: "На углях", price: 450, weight: "150г", emoji: "🥩", category: "Шашлык на углях" },
  { id: 10, name: "Ливер бараний (сердце, почки)", desc: "На углях", price: 350, weight: "150г", emoji: "🍢", category: "Шашлык на углях" },
  { id: 11, name: "Филе бедра куриное", desc: "На углях", price: 450, weight: "200г", emoji: "🍗", category: "Шашлык на углях" },
  { id: 12, name: "Сердца куриные", desc: "На углях", price: 400, weight: "170г", emoji: "🍗", category: "Шашлык на углях" },
  { id: 13, name: "Крылья куриные", desc: "На углях", price: 400, weight: "250г", emoji: "🍗", category: "Шашлык на углях" },
  { id: 14, name: "Люля (курица)", desc: "На углях", price: 350, weight: "140г", emoji: "🍢", category: "Шашлык на углях" },
  { id: 15, name: "Люля (баранина)", desc: "На углях", price: 400, weight: "140г", emoji: "🍢", category: "Шашлык на углях" },
  { id: 16, name: "Люля (телятина)", desc: "На углях", price: 390, weight: "140г", emoji: "🍢", category: "Шашлык на углях" },
  { id: 17, name: "Грибы", desc: "На углях", price: 250, weight: "150г", emoji: "🍄", category: "Шашлык на углях" },
  { id: 18, name: "Овощи", desc: "На углях", price: 350, weight: "250г", emoji: "🥦", category: "Шашлык на углях" },
  // Кебаб в лаваше
  { id: 19, name: "Кебаб из баранины", desc: "Кебаб, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 450, weight: "410г", emoji: "🍢", category: "Кебаб в лаваше" },
  { id: 20, name: "Кебаб из телятины", desc: "Кебаб, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 430, weight: "410г", emoji: "🍢", category: "Кебаб в лаваше" },
  { id: 21, name: "Кебаб из курицы", desc: "Кебаб, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 400, weight: "410г", emoji: "🍢", category: "Кебаб в лаваше" },
  { id: 22, name: "Кебаб-душарик", desc: "Кебаб, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 500, weight: "440г", emoji: "🍢", category: "Кебаб в лаваше" },
  { id: 23, name: "Кебаб-убийца", desc: "Кебаб из телятины, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 800, weight: "550г", emoji: "🌶️", category: "Кебаб в лаваше" },
  { id: 24, name: "Кебаб-дубль мит", desc: "Кебаб из телятины, сердца куриные, зелень, лук, огурец, помидор, сыр, картошка, 2 соуса", price: 850, weight: "600г", emoji: "🍢", category: "Кебаб в лаваше" },
  // Шаурма
  { id: 25, name: "Классическая", desc: "Зелень, лук, огурец, помидор, соус чесночный, мясо", price: 330, weight: "330г", emoji: "🌯", category: "Шаурма" },
  { id: 26, name: "Сырная", desc: "Зелень, лук, огурец, помидор, соус сырный, мясо, сыр", price: 350, weight: "350г", emoji: "🌯", category: "Шаурма" },
  { id: 27, name: "Огненная", desc: "Зелень, лук, огурец, помидор, мясо, соус аджика", price: 330, weight: "330г", emoji: "🌶️", category: "Шаурма" },
  { id: 28, name: "Торпеда", desc: "Зелень, лук, огурец, помидор, 2 соуса, мясо, картошка", price: 450, weight: "500г", emoji: "🌯", category: "Шаурма" },
  { id: 29, name: "Бродяга", desc: "Зелень, лук, огурец, помидор, соус кетчуп, сыр", price: 220, weight: "200г", emoji: "🌯", category: "Шаурма" },
  { id: 30, name: "Студенческая", desc: "Мясо, картошка, зелень, лук, соус сырный", price: 250, weight: "250г", emoji: "🌯", category: "Шаурма" },
  // Сеты
  { id: 31, name: "Кавказский букет", desc: "Кебаб из курицы 2 порции, кебаб из баранины 2 порции, кебаб из телятины 3 порции, 2 соуса, 2 лаваша, свежие овощи", price: 2900, weight: "1000г", emoji: "🎉", category: "Сеты" },
  { id: 32, name: "Бархатная цена", desc: "Крылья куриные 2 порции, филе бедра куриное 2 порции, кебаб из курицы 2 порции, сердца куриные 2 порции, 2 соуса, 2 лаваша, свежие овощи", price: 3300, weight: "1500г", emoji: "🎉", category: "Сеты" },
  { id: 33, name: "Аджарагуджу", desc: "Овощи 2 порции, грибы 3 порции", price: 1700, weight: "1250г", emoji: "🥗", category: "Сеты" },
  { id: 34, name: "Сборная мясника", desc: "Каре ягнёнка, мякоть баранины, печень баранины, кебаб из телятины, филе бедра куриное 2 порции, крылья куриные 3 порции, 2 соуса, 2 лаваша, свежие овощи", price: 4900, weight: "2000г", emoji: "🍖", category: "Сеты" },
  { id: 35, name: "Фраер", desc: "Филе бедра куриное 5 порций, мякоть баранины 2 порции, грибы 2 порции, овощи 2 порции, 2 соуса, 2 лаваша", price: 6200, weight: "2700г", emoji: "👑", category: "Сеты" },
  { id: 36, name: "Сет по братски", desc: "Мякоть баранины 2 порции, мендаль баранины 2 порции, филе бедра куриное 2 порции, сердца куриные 2 порции, 2 соуса, 2 лаваша, свежие овощи", price: 4800, weight: "2000г", emoji: "🤝", category: "Сеты" },
  { id: 37, name: "Сет нежный", desc: "Филе бедра куриное 3 порции, крылья куриные 2 порции, кебаб куриный 3 порции, 2 соуса, 2 лаваша", price: 3900, weight: "1800г", emoji: "🍗", category: "Сеты" },
  { id: 38, name: "Сет на компанию", desc: "Каре ягнёнка 3 порции, мякоть баранины 3 порции, крылья 3 порции, филе бедра куриное 3 порции, кебаб телятины 3 порции, кебаб баранины 3 порции, кебаб куриный 3 порции", price: 10000, weight: "4000г", emoji: "🎊", category: "Сеты" },
  // Наборы
  { id: 39, name: "Комбо", desc: "Шаурма сырная 350г, картошка фри 100г, компот 0.5л", price: 700, weight: "—", emoji: "🍟", category: "Наборы" },
  { id: 40, name: "Комбо с кебабом", desc: "Кебаб из телятины 410г, картошка фри 100г, напиток 0.5л", price: 800, weight: "—", emoji: "🍟", category: "Наборы" },
  // Закуски
  { id: 41, name: "Фри большая", desc: "Картофель фри", price: 250, weight: "200г", emoji: "🍟", category: "Закуски" },
  { id: 42, name: "Фри мета", desc: "Большая порция картофеля фри", price: 550, weight: "500г", emoji: "🍟", category: "Закуски" },
  { id: 43, name: "Палочки сырные (6 шт)", desc: "", price: 300, weight: "120г", emoji: "🧀", category: "Закуски" },
  { id: 44, name: "Кольца кальмара (6 шт)", desc: "", price: 300, weight: "120г", emoji: "🦑", category: "Закуски" },
  { id: 45, name: "Креветки (6 шт)", desc: "", price: 300, weight: "120г", emoji: "🍤", category: "Закуски" },
  { id: 46, name: "Напетос (10 шт)", desc: "", price: 300, weight: "250г", emoji: "🥨", category: "Закуски" },
  // Доп
  { id: 47, name: "Доп соус", desc: "", price: 50, weight: "—", emoji: "🫙", category: "Доп" },
  { id: 48, name: "Доп лаваш", desc: "", price: 40, weight: "—", emoji: "🫓", category: "Доп" },
  { id: 49, name: "Бокс для шашлыка", desc: "Лук, зелень", price: 50, weight: "—", emoji: "📦", category: "Доп" },
  { id: 50, name: "Доп к шашлыку", desc: "Лук, зелень, огурец, помидор, соус чесночный, лаваш, бокс", price: 200, weight: "—", emoji: "📦", category: "Доп" },
  // Напитки
  { id: 51, name: "Чай чёрный/зелёный", desc: "", price: 80, weight: "0.3л", emoji: "🍵", category: "Напитки" },
  { id: 52, name: "Американо большой", desc: "", price: 150, weight: "0.3л", emoji: "☕", category: "Напитки" },
  { id: 53, name: "Эспрессо", desc: "", price: 70, weight: "—", emoji: "☕", category: "Напитки" },
  { id: 54, name: "Капучино", desc: "", price: 150, weight: "0.3л", emoji: "☕", category: "Напитки" },
  { id: 55, name: "Латте", desc: "", price: 170, weight: "—", emoji: "🥛", category: "Напитки" },
  { id: 56, name: "Айран", desc: "", price: 150, weight: "—", emoji: "🥛", category: "Напитки" },
  { id: 57, name: "Компот", desc: "", price: 150, weight: "—", emoji: "🍹", category: "Напитки" },
];

const CATEGORIES = ["Все", "Шашлык в лаваше", "Шашлык на углях", "Кебаб в лаваше", "Шаурма", "Сеты", "Наборы", "Закуски", "Доп", "Напитки"];

const SCHEDULE = [
  { day: "Понедельник", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Вторник", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Среда", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Четверг", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Пятница", open: "11:00", close: "23:00", delivery: "12:00–22:00", isOff: false },
  { day: "Суббота", open: "10:00", close: "23:00", delivery: "11:00–22:00", isOff: false },
  { day: "Воскресенье", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
];

const DAYS_SHORT = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];

type Tab = "menu" | "cart" | "profile" | "schedule";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("menu");
  const [category, setCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [points] = useState(340);
  const [usePoints, setUsePoints] = useState(false);

  const addToCart = (item: typeof MENU[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, emoji: item.emoji }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && existing.qty > 1) return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
      return prev.filter(c => c.id !== id);
    });
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = usePoints ? Math.min(points, Math.floor(cartTotal * 0.1)) : 0;
  const finalTotal = cartTotal - discount;

  const filtered = category === "Все" ? MENU : MENU.filter(m => m.category === category);

  const today = DAYS_SHORT[new Date().getDay()];
  const todaySchedule = SCHEDULE.find(s => s.day.startsWith(today.slice(0, 2)) || today === DAYS_SHORT[SCHEDULE.indexOf(s)]) ?? SCHEDULE[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div className="app-root">
      {/* Hero */}
      <div className="hero-section">
        <img src={HERO_IMG} alt="Шашлык" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">🔥 Горячо и сочно</div>
          <h1 className="hero-title">Шашлык<br /><span className="hero-accent">У Дони</span></h1>
          <div className="hero-status">
            <span className="status-dot" />
            <span>Открыто</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-area">
        {tab === "menu" && (
          <div className="tab-content animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Меню</h2>
            </div>
            <div className="cats-row">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`cat-btn ${category === cat ? "cat-btn--active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="menu-grid">
              {filtered.map(item => {
                const inCart = cart.find(c => c.id === item.id);
                return (
                  <div key={item.id} className="menu-card">
                    <div className="menu-emoji">{item.emoji}</div>
                    <div className="menu-info">
                      <div className="menu-name">{item.name}</div>
                      <div className="menu-desc">{item.desc}</div>
                      <div className="menu-meta">
                        <span className="menu-weight">{item.weight}</span>
                        <span className="menu-price">{item.price}₽</span>
                      </div>
                    </div>
                    <div className="menu-action">
                      {inCart ? (
                        <div className="qty-control">
                          <button onClick={() => removeFromCart(item.id)} className="qty-btn">−</button>
                          <span className="qty-num">{inCart.qty}</span>
                          <button onClick={() => addToCart(item)} className="qty-btn">+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="add-btn">
                          <Icon name="Plus" size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "cart" && (
          <div className="tab-content animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Корзина</h2>
            </div>
            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🧺</div>
                <div className="empty-text">Корзина пуста</div>
                <button onClick={() => setTab("menu")} className="cta-btn">Перейти в меню</button>
              </div>
            ) : (
              <div className="cart-wrap">
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <span className="cart-emoji">{item.emoji}</span>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">{item.price}₽ × {item.qty}</div>
                      </div>
                      <div className="qty-control">
                        <button onClick={() => removeFromCart(item.id)} className="qty-btn">−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button onClick={() => addToCart({ ...item, desc: "", weight: "", category: "" })} className="qty-btn">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="points-card">
                  <div className="points-header">
                    <Icon name="Star" size={18} />
                    <span>Бонусные баллы</span>
                    <span className="points-count">{points} баллов</span>
                  </div>
                  <label className="points-toggle">
                    <input type="checkbox" checked={usePoints} onChange={e => setUsePoints(e.target.checked)} />
                    <span>Списать баллы (до {Math.floor(cartTotal * 0.1)} баллов = скидка {Math.floor(cartTotal * 0.1)}₽)</span>
                  </label>
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Сумма заказа</span>
                    <span>{cartTotal}₽</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row summary-discount">
                      <span>Скидка баллами</span>
                      <span>−{discount}₽</span>
                    </div>
                  )}
                  <div className="summary-row summary-total">
                    <span>К оплате</span>
                    <span>{finalTotal}₽</span>
                  </div>
                </div>
                <button className="cta-btn" onClick={() => {
                  const lines = cart.map(item => `• ${item.name} × ${item.qty} — ${item.price * item.qty}₽`).join('\n');
                  const text = `🔥 Новый заказ!\n\n${lines}\n\nИтого: ${finalTotal}₽`;
                  window.open(`https://wa.me/7398339?text=${encodeURIComponent(text)}`, '_blank');
                }}>Оформить заказ</button>
                <p className="cart-hint">+{Math.floor(finalTotal * 0.05)} баллов начислим за этот заказ</p>
              </div>
            )}
          </div>
        )}

        {tab === "profile" && (
          <div className="tab-content animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Профиль</h2>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <div className="profile-name">Гость</div>
              <div className="profile-phone">Войдите, чтобы видеть историю заказов</div>
            </div>
            <div className="points-big-card">
              <div className="points-big-label">Мои баллы</div>
              <div className="points-big-num">{points}</div>
              <div className="points-big-sub">1 балл = 1 рубль скидки</div>
              <div className="points-progress-bar">
                <div className="points-progress-fill" style={{ width: `${(points / 1000) * 100}%` }} />
              </div>
              <div className="points-big-hint">Ещё {1000 - points} баллов до уровня «Мастер Шашлыка»</div>
            </div>
            <div className="orders-section">
              <div className="orders-title">История заказов</div>
              <div className="order-item">
                <div className="order-meta">
                  <span className="order-date">15 марта 2026</span>
                  <span className="order-status order-status--done">Выполнен</span>
                </div>
                <div className="order-desc">Шашлык из баранины × 2, Лаваш × 2</div>
                <div className="order-price">1 460₽</div>
              </div>
              <div className="order-item">
                <div className="order-meta">
                  <span className="order-date">8 марта 2026</span>
                  <span className="order-status order-status--done">Выполнен</span>
                </div>
                <div className="order-desc">Люля-кебаб × 3, Соус ткемали</div>
                <div className="order-price">1 560₽</div>
              </div>
            </div>
            <button className="login-btn">Войти / Зарегистрироваться</button>
          </div>
        )}

        {tab === "schedule" && (
          <div className="tab-content animate-fade-in">
            <div className="section-header">
              <h2 className="section-title">Расписание</h2>
            </div>
            <div className="schedule-hero">
              <Icon name="Clock" size={32} />
              <div className="schedule-hero-text">
                <div className="schedule-hero-day">Сегодня</div>
                <div className="schedule-hero-time">
                  {SCHEDULE[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].isOff
                    ? "Выходной"
                    : `${SCHEDULE[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].open} – ${SCHEDULE[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1].close}`
                  }
                </div>
              </div>
            </div>
            <div className="schedule-list">
              {SCHEDULE.map((s, i) => (
                <div key={s.day} className={`schedule-row ${s.isOff ? "schedule-row--off" : ""} ${i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1) ? "schedule-row--today" : ""}`}>
                  <div className="schedule-day">{s.day}</div>
                  {s.isOff ? (
                    <div className="schedule-off">Выходной</div>
                  ) : (
                    <div className="schedule-times">
                      <span className="schedule-work">{s.open} – {s.close}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="schedule-note">
              <Icon name="Info" size={16} />
              <span>Последний заказ принимается за 1 час до закрытия кухни</span>
            </div>
            <div className="contacts-block">
              <div className="contacts-title">Контакты</div>
              <div className="contact-row"><Icon name="Phone" size={16} /><span>39-83-39</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button onClick={() => setTab("menu")} className={`nav-btn ${tab === "menu" ? "nav-btn--active" : ""}`}>
          <Icon name="UtensilsCrossed" size={22} />
          <span>Меню</span>
        </button>
        <button onClick={() => setTab("cart")} className={`nav-btn ${tab === "cart" ? "nav-btn--active" : ""} nav-btn--cart`}>
          <div className="cart-icon-wrap">
            <Icon name="ShoppingCart" size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <span>Корзина</span>
        </button>
        <button onClick={() => setTab("profile")} className={`nav-btn ${tab === "profile" ? "nav-btn--active" : ""}`}>
          <Icon name="User" size={22} />
          <span>Профиль</span>
        </button>
        <button onClick={() => setTab("schedule")} className={`nav-btn ${tab === "schedule" ? "nav-btn--active" : ""}`}>
          <Icon name="Clock" size={22} />
          <span>Часы</span>
        </button>
      </nav>
    </div>
  );
}