import React from "react";

export const metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility Statement for the SARRA website — WCAG 2.1 AA compliance, Government of Uttarakhand.",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Statement</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Our Commitment</h2>
            <p>
              The Spring and River Rejuvenation Authority (SARRA), Government of Uttarakhand,
              is committed to ensuring that this website is accessible to all users, including
              persons with disabilities. We strive to comply with the Web Content Accessibility
              Guidelines (WCAG) 2.1 Level AA, as mandated by the Guidelines for Indian Government
              Websites (GIGW 3.0).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Accessibility Features</h2>
            <p>This website incorporates the following accessibility features:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Keyboard Navigation:</strong> All functionality is accessible via keyboard.
                Users can navigate through links, buttons, and form fields using the Tab key.
              </li>
              <li>
                <strong>Screen Reader Compatibility:</strong> The website is designed to be
                compatible with popular screen readers such as JAWS, NVDA, and VoiceOver.
              </li>
              <li>
                <strong>Alt Text:</strong> All images include descriptive alternative text for
                screen reader users and when images fail to load.
              </li>
              <li>
                <strong>Semantic HTML:</strong> Proper heading hierarchy (H1-H6) and semantic
                HTML elements are used throughout the website.
              </li>
              <li>
                <strong>Responsive Design:</strong> The website adapts to different screen sizes
                and devices, ensuring usability on mobile phones, tablets, and desktops.
              </li>
              <li>
                <strong>Colour Contrast:</strong> Text and background colours meet the minimum
                contrast ratio requirements of WCAG 2.1 Level AA.
              </li>
              <li>
                <strong>Resizable Text:</strong> Text can be resized up to 200% without loss of
                content or functionality.
              </li>
              <li>
                <strong>Skip Navigation:</strong> A &ldquo;Skip to Content&rdquo; link is provided for
                keyboard users to bypass navigation menus.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Supported Browsers</h2>
            <p>
              This website is optimised for the latest versions of the following browsers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Known Limitations</h2>
            <p>
              While we strive for full accessibility compliance, some content may have limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Some older PDF documents may not be fully accessible. We are working to
                remediate these files.
              </li>
              <li>
                Third-party content (embedded maps, external links) may not fully comply with
                accessibility standards.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of this website. If you encounter any
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <p><strong>Spring and River Rejuvenation Authority (SARRA)</strong></p>
              <p>Government of Uttarakhand</p>
              <p>Dehradun, Uttarakhand, India</p>
              <p>Email: sarra@uk.gov.in</p>
            </div>
            <p className="mt-2">
              We will make reasonable efforts to respond to your feedback within 5 working days
              and address any issues as soon as possible.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
