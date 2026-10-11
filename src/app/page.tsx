"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { RolesSection } from "@/components/sections/roles-section";
import { StepsSection } from "@/components/sections/steps-section";
import { RewardsSection } from "@/components/sections/rewards-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { Footer } from "@/components/footer";
import { RegisterModal } from "@/components/register-modal";
import { InquiryModal } from "@/components/inquiry-modal";

export default function HomePage() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Contributor");
  const [inquiryType, setInquiryType] = useState<"sponsor" | "partner" | null>(null);

  const handleOpenRegister = (role = "Contributor") => {
    setSelectedRole(role);
    setRegisterOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* 0. Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister("Contributor")} />

      <main className="flex-1">
        {/* 0. Hero and Program Stats */}
        <HeroSection onOpenRegister={() => handleOpenRegister("Contributor")} />

        {/* 1. About the Program (Editorial Split, Benefit Cards & Quote) */}
        <BenefitsSection />

        {/* 1b. Participation Roles */}
        <RolesSection onSelectRole={(role) => handleOpenRegister(role)} />

        {/* 2. Contribution Steps */}
        <StepsSection onOpenRegister={() => handleOpenRegister("Contributor")} />

        {/* 3. Prizes and Recognition */}
        <RewardsSection />

        {/* 4. Program Timeline */}
        <TimelineSection />

        {/* 5. Sponsors and Community */}
        <SponsorsSection onSponsorModalOpen={() => setInquiryType("sponsor")} />
        <PartnersSection onPartnerModalOpen={() => setInquiryType("partner")} />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        defaultRole={selectedRole}
      />

      <InquiryModal
        isOpen={inquiryType !== null}
        type={inquiryType || "sponsor"}
        onClose={() => setInquiryType(null)}
      />
    </div>
  );
}
