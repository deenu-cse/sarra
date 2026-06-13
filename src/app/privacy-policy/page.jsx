import React from "react";
import { generatePageMeta } from "@/lib/seo.config";

export const metadata = generatePageMeta({
  title: "Privacy Policy | SARRA Uttarakhand",
  description: "Privacy Policy for the SARRA (Spring and River Rejuvenation Authority) website, Government of Uttarakhand.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p>
              The Spring and River Rejuvenation Authority (SARRA), Government of Uttarakhand,
              is committed to protecting the privacy of all visitors to this official government website.
              This Privacy Policy outlines the types of personal information collected, how it is used,
              stored, and protected in accordance with the Information Technology Act, 2000 and the
              Information Technology (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and
                designation when voluntarily provided through forms or registration.
              </li>
              <li>
                <strong>Location Data:</strong> GPS coordinates and geographic information when
                submitted through the Bhagirath mobile application for spring mapping.
              </li>
              <li>
                <strong>Media:</strong> Photographs and images uploaded as part of spring/river
                documentation and DPR (Detailed Project Report) submissions.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser type, operating system,
                and access times for security and analytics purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Purpose of Data Collection</h2>
            <p>The data collected is used solely for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Spring and river rejuvenation project planning and monitoring</li>
              <li>Processing Detailed Project Reports (DPRs) under government schemes</li>
              <li>Communication regarding government initiatives and programmes</li>
              <li>Improving website functionality and user experience</li>
              <li>Compliance with government audit and reporting requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Storage and Security</h2>
            <p>
              All data is stored on secure government-approved servers managed by ITDA (IT Development
              Agency), Government of Uttarakhand. We implement industry-standard security measures
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL/TLS encryption for all data in transit</li>
              <li>Encrypted database storage with access controls</li>
              <li>Regular security audits as per CERT-In guidelines</li>
              <li>Role-based access control for administrative functions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Third-Party Services</h2>
            <p>
              We use Cloudinary (a cloud-based media management service) for storing and delivering
              images and documents. Cloudinary&apos;s servers may be located outside India. By uploading
              content, you consent to the transfer of such data. Cloudinary&apos;s privacy policy governs
              the handling of data on their servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
            <p>As a user, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data (subject to legal obligations)</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Cookies</h2>
            <p>
              This website uses essential cookies for authentication and session management.
              These are httpOnly secure cookies and cannot be accessed by client-side scripts.
              No tracking or advertising cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Contact for Privacy Concerns</h2>
            <p>
              For any privacy-related queries or concerns, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <p><strong>Spring and River Rejuvenation Authority (SARRA)</strong></p>
              <p>Government of Uttarakhand</p>
              <p>Dehradun, Uttarakhand, India</p>
              <p>Email: sarra@uk.gov.in</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Changes to This Policy</h2>
            <p>
              This privacy policy may be updated from time to time. Any changes will be posted
              on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
