import React, { useState, useEffect } from "react";

interface ProfileImageProps {
  memberNo: string; // รับ memberNo เพื่อดึงข้อมูล
}

const ProfileImage: React.FC<ProfileImageProps> = ({ memberNo }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/profileImg?memberNo=${memberNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile image");
        }

        const data = await response.json();
        if (data?.photo) {
          setProfileImage(data.photo); // ถ้ามีรูป ให้เก็บ URL ของรูป
        } else {
          setProfileImage(null); // ถ้าไม่มีรูป
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false); // เมื่อโหลดเสร็จให้เปลี่ยนสถานะเป็นไม่โหลดแล้ว
      }
    };

    if (memberNo) {
      fetchProfileImage();
    }
  }, [memberNo]); // เมื่อ memberNo เปลี่ยน ให้ทำการดึงข้อมูลใหม่

  if (loading) {
    return <div>Loading...</div>; // แสดงขณะกำลังโหลด
  }

  if (error) {
    return <div>Error: {error}</div>; // แสดงข้อผิดพลาด
  }

  return (
    <div className="w-full p-4 flex justify-center ">
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-48 h-48 object-cover "
        />
      ) : (
        <div>No Profile Image Available</div> // ถ้าไม่มีรูป
      )}
    </div>
  );
};

export default ProfileImage;
