"use client";

import { useRef, useState } from "react";
import { User, Mail, Phone, Building2, MapPin, Camera } from "lucide-react";
import Image from "next/image";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button }   from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "./shared";

export function ProfileSection({ onSave }: { onSave: (msg: string) => void }) {
  const [name,     setName]     = useState("Jane Cooper");
  const [email,    setEmail]    = useState("jane.cooper@wuffoos.com");
  const [phone,    setPhone]    = useState("+1 (555) 000-0000");
  const [bio,      setBio]      = useState("Platform administrator managing all contests and participants.");
  const [company,  setCompany]  = useState("Wuffoos");
  const [location, setLocation] = useState("New York, USA");
  const [avatar,   setAvatar]   = useState<string>("/images/userprofile.png");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const handleRemove = () => {
    setAvatar("/images/userprofile.png");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Section
      title="Profile Settings"
      description="Update your personal information and public profile"
      onSave={() => onSave("Profile saved successfully")}
    >
      {/* Avatar */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#A01C1C]/20 overflow-hidden">
                <Image
                  src={avatar}
                  alt="Profile photo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#A01C1C] text-white flex items-center justify-center shadow-md hover:bg-[#851717] transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Profile Photo</p>
              <p className="text-xs text-gray-400 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="h-8 text-xs border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Upload New
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="h-8 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fields */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="pt-5 pb-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name",     icon: User,      value: name,    set: setName,    type: "text"  },
              { label: "Email Address", icon: Mail,      value: email,   set: setEmail,   type: "email" },
              { label: "Phone Number",  icon: Phone,     value: phone,   set: setPhone,   type: "text"  },
              { label: "Company",       icon: Building2, value: company, set: setCompany, type: "text"  },
            ].map(({ label, icon: Icon, value, set, type }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-gray-400" /> {label}
                </Label>
                <Input
                  type={type}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="bg-gray-50 border-gray-200 focus-visible:border-[#A01C1C] focus-visible:ring-[#A01C1C]/20 h-10"
                />
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> Location
            </Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-50 border-gray-200 focus-visible:border-[#A01C1C] focus-visible:ring-[#A01C1C]/20 h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-600">Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              className="resize-none bg-gray-50 border-gray-200 focus-visible:border-[#A01C1C] focus-visible:ring-[#A01C1C]/20 text-sm"
            />
            <p className="text-right text-[11px] text-gray-400">{bio.length}/160</p>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}