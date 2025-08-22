//scuccess.jsx
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div>
        <h1 data-cy="success-title">Giriş başarılı 🎉</h1>
        <p>Test için geçici success sayfası.</p>
        <Link to="/" data-cy="back-home">Geri dön</Link>
        </div>
    );

}
