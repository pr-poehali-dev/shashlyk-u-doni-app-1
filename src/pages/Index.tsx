import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3605f624-aa80-47f5-adf9-894f0efd8fb2/files/ed040472-dbf5-482f-8534-b13fd1e176d6.jpg";

const MENU = [
  { id: 1, name: "Шашлык из баранины", desc: "Нежная баранина на углях, маринад из специй", price: 650, weight: "300г", emoji: "🍖", category: "Шашлык" },
  { id: 2, name: "Шашлык из свинины", desc: "Сочная свинина, маринованная в луке и специях", price: 520, weight: "300г", emoji: "🥩", category: "Шашлык" },
  { id: 3, name: "Куриный шашлык", desc: "Филе куриной грудки в йогуртовом маринаде", price: 420, weight: "300г", emoji: "🍗", category: "Шашлык" },
  { id: 4, name: "Люля-кебаб", desc: "Рубленый фарш с зеленью на шампуре", price: 480, weight: "250г", emoji: "🍢", category: "Шашлык" },
  { id: 5, name: "Овощи на гриле", desc: "Баклажан, перец, помидор, кабачок", price: 280, weight: "200г", emoji: "🥦", category: "Гарниры" },
  { id: 6, name: "Лаваш", desc: "Тонкий армянский лаваш, свежеиспечённый", price: 80, weight: "2 шт", emoji: "🫓", category: "Гарниры" },
  { id: 7, name: "Соус ткемали", desc: "Традиционный грузинский соус из слив", price: 120, weight: "150мл", emoji: "🫙", category: "Соусы" },
  { id: 8, name: "Соус аджика", desc: "Острая аджика с чесноком и перцем", price: 120, weight: "150мл", emoji: "🌶️", category: "Соусы" },
];

const CATEGORIES = ["Все", "Шашлык", "Гарниры", "Соусы"];

const SCHEDULE = [
  { day: "Понедельник", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Вторник", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Среда", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Четверг", open: "11:00", close: "22:00", delivery: "12:00–21:00", isOff: false },
  { day: "Пятница", open: "11:00", close: "23:00", delivery: "12:00–22:00", isOff: false },
  { day: "Суббота", open: "10:00", close: "23:00", delivery: "11:00–22:00", isOff: false },
  { day: "Воскресенье", open: "", close: "", delivery: "", isOff: true },
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
          <p className="hero-sub">Доставка от 60 мин · Минимум 800₽</p>
          <div className="hero-status">
            <span className="status-dot" />
            <span>Открыто · Доставка до 21:00</span>
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
                <button className="cta-btn">Оформить заказ</button>
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
                  <span className="order-status order-status--done">Доставлен</span>
                </div>
                <div className="order-desc">Шашлык из баранины × 2, Лаваш × 2</div>
                <div className="order-price">1 460₽</div>
              </div>
              <div className="order-item">
                <div className="order-meta">
                  <span className="order-date">8 марта 2026</span>
                  <span className="order-status order-status--done">Доставлен</span>
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
                      <span className="schedule-delivery">🛵 {s.delivery}</span>
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
              <div className="contact-row"><Icon name="Phone" size={16} /><span>+7 (999) 123-45-67</span></div>
              <div className="contact-row"><Icon name="MapPin" size={16} /><span>г. Москва, ул. Мясницкая, 12</span></div>
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
