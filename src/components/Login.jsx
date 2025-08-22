import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "", terms: false });
  const [touched, setTouched] = useState({ email: false, password: false, terms: false });

  const errors = useMemo(() => {
    const e = {};
    if (!emailRegex.test(values.email)) e.email = "Geçerli bir e-posta girin.";
    if (!strongPwdRegex.test(values.password)) e.password = "Şifre en az 8 karakter ve büyük/küçük harf, rakam ve özel karakter içermelidir.";
    if (!values.terms) e.terms = "Devam etmek için şartları kabul etmelisiniz.";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setValues(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, terms: true });
    if (isValid) navigate("/success");
  };

  const Error = ({ children }) => (
    <div data-cy="error" style={{ color: "crimson", fontSize: 14, marginTop: 4 }}>{children}</div>
  );

  return (
    <form onSubmit={handleSubmit} data-cy="login-form">
      <h1>Giriş Yap</h1>

      <label htmlFor="email">E-posta</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="ornek@mail.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        data-cy="email-input"
      />
      {touched.email && errors.email && <Error>{errors.email}</Error>}

      <label htmlFor="password" style={{ marginTop: 12, display: "block" }}>Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Güçlü bir şifre"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        data-cy="password-input"
      />
      {touched.password && errors.password && <Error>{errors.password}</Error>}

      <div style={{ marginTop: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            data-cy="terms-checkbox"
          />
          Şartları kabul ediyorum
        </label>
        {touched.terms && errors.terms && <Error>{errors.terms}</Error>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        data-cy="submit-btn"
        style={{ marginTop: 16, padding: "8px 12px" }}
      >
        Login
      </button>
    </form>
  );
}