import React, { useState, useEffect } from "react";

interface ProfileImageProps {
  memberNo: string;
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
          setProfileImage(data.photo);
        } else {
          setProfileImage(null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (memberNo) {
      fetchProfileImage();
    }
  }, [memberNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
        <div>No Profile Image Available</div>
      )}
    </div>
  );
};

export default ProfileImage;
