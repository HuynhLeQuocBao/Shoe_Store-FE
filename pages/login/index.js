import React from "react";
import { Login } from "@/components/section/auth";
import { Breadcrumbs } from "@/components/section/title";

export default function LoginPage() {
  return (
    <div>
      <Breadcrumbs />
      <Login />
    </div>
  );
}
