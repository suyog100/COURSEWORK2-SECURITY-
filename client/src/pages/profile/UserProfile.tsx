import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api/api";
import toast from "react-hot-toast";
import NavigationComponent from "@/components/custom/Navigation";

type UserProfile = {
  username: string;
  email: string;
  phone: string;
  profileImage: string;
};

function UserProfile() {
  const [user, setUser] = useState<UserProfile>({
    username: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    api
      .get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.data);
        setUsername(res.data.data.username);
        setPhone(res.data.data.phone);
        setEmail(res.data.data.email);
        setProfileImagePreview(
          "http://localhost:3000" + res.data.data.profileImage ||
            "/placeholder-user.jpg",
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const updateProfile = async () => {
      const payload = {
        username,
        phone,
      };

      // Update profile data
      try {
        const res = await api.post("/api/user/profile", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          toast.success("Profile updated successfully");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to update profile");
      }

      // Upload profile picture if a new one was selected
      if (profileImage) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);

        try {
          const res = await api.post(
            "/api/user/upload-profile-picture",
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
          if (res.data.success) {
            toast.success("Profile picture updated successfully");
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed to update profile picture");
        }
      }
    };

    updateProfile();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className='min-h-screen bg-slate-100'>
      <NavigationComponent />
      <div className='w-full max-w-md mx-auto py-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <Button
            onClick={() => setEditable(!editable)}
            variant='outline'
            size='icon'
            className={`${editable ? "bg-green-500" : ""}`}
          >
            <PencilIcon className='h-5 w-5' />
            <span className='sr-only'>Edit</span>
          </Button>
        </div>
        {editable ? (
          <h3 className='py-1 text-xl text-center'>Editing...</h3>
        ) : null}
        <Card className='pt-8'>
          <CardContent className='grid gap-6'>
            <div className='grid grid-cols-[auto_1fr] items-center gap-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src={profileImagePreview} />
                <AvatarFallback>
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <div className='text-lg font-semibold'>{user.username}</div>
                <div className='text-muted-foreground'>
                  <span>{user.email}</span>
                  <span className='text-muted-foreground'> | </span>
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='username'>Username</Label>
              <Input
                disabled={!editable}
                id='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                disabled={!editable}
                id='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                disabled={true}
                id='email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='profile-picture'>Profile Picture</Label>
              <div className='flex items-center gap-2'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={profileImagePreview} />
                  <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <input
                  type='file'
                  id='profile-picture'
                  onChange={handleImageChange}
                  disabled={!editable}
                  style={{ display: "none" }}
                />
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    document.getElementById("profile-picture")?.click()
                  }
                  disabled={!editable}
                >
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            {editable ? (
              <>
                <Button onClick={() => setEditable(false)} variant='outline'>
                  Cancel
                </Button>
                <Button onClick={onSave} type='submit' className='bg-green-500'>
                  Save
                </Button>
              </>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default UserProfile;

function PencilIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
      <path d='m15 5 4 4' />
    </svg>
  );
}
