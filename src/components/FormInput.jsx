function FormInput({ label, value, onChange, type = "text", required }) {
    return (
        <div className="mb-3">
        <label className="form-label fw-semibold">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={`Masukkan ${label}`}
            className="form-control"
        />
        </div>
    );
    }
export default FormInput;
