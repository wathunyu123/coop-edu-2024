type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    type: "editStatus" | "otp" | "timer" | "document"; // เพิ่ม 'type' ให้รองรับค่าที่ต้องการ
};

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null; // ถ้า Popup ไม่เปิดจะไม่แสดง

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button onClick={onClose} className="close-button">Close</button>
                <div>
                    {type === "editStatus" && <p>นี่คือการแก้ไขสถานะ</p>}
                    {type === "otp" && <p>นี่คือการตั้งค่ารหัส OTP</p>}
                    {type === "timer" && <p>นี่คือการตั้งค่าจับเวลา</p>}
                    {type === "document" && <p>นี่คือการดูเอกสาร</p>}
                </div>
            </div>
        </div>
    );
};

export default Popup;
