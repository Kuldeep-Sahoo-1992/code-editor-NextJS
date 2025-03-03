"use client"
import { SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";
import LoginButtom from "./LoginButtom";

const HeaderProfileBtn = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4"/>}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <LoginButtom/>
      </SignedOut>
    </>
  );
};

export default HeaderProfileBtn;
