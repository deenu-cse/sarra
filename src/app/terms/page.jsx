import React from "react";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the SARRA website, Government of Uttarakhand.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. General</h2>
            <p>
              This website is designed, developed, and maintained by the Spring and River
              Rejuvenation Authority (SARRA), Government of Uttarakhand. Though all efforts
              have been made to ensure the accuracy and currency of the content, the same should
              not be construed as a statement of law or used for any legal purposes. In case of
              any ambiguity or doubt, users are advised to verify/check with the Authority and/or
              other source(s), and to obtain appropriate professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Terms of Use</h2>
            <p>By accessing and using this website, you agree to the following terms:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                This website is for informational purposes related to the government&apos;s spring
                and river rejuvenation programmes in Uttarakhand.
              </li>
              <li>
                Unauthorized attempts to upload, modify, or tamper with the content or software
                on this website are strictly prohibited and may be punishable under the Information
                Technology Act, 2000.
              </li>
              <li>
                Any information provided by users through forms and submissions shall be used
                solely for the purpose stated on the respective form.
              </li>
              <li>
                SARRA reserves the right to modify, update, or discontinue any part of this
                website without prior notice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Links to External Websites</h2>
            <p>
              This website may contain links to other Government of India and State Government
              websites. The content of these linked websites is not maintained or controlled by SARRA.
              Links are provided for convenience and do not constitute an endorsement of the
              information on these websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Intellectual Property</h2>
            <p>
              The material featured on this website (including text, data, graphics, images,
              photographs) is the property of the Government of Uttarakhand unless otherwise
              stated. No part of this website may be reproduced, distributed, or transmitted
              without proper permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Disclaimer</h2>
            <p>
              Under no circumstances will SARRA or the Government of Uttarakhand be liable for
              any expense, loss or damage, including without limitation, indirect or consequential
              loss or damage, or any loss or damage arising from the use of data or information
              obtained from this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India.
              Any disputes arising shall be subject to the exclusive jurisdiction of courts in
              Dehradun, Uttarakhand.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
