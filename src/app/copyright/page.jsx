import React from "react";

export const metadata = {
  title: "Copyright Policy",
  description:
    "Copyright Policy for the SARRA website, Government of Uttarakhand.",
};

export default function CopyrightPage() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Copyright Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Copyright Notice</h2>
            <p>
              © {new Date().getFullYear()} Spring and River Rejuvenation Authority (SARRA),
              Government of Uttarakhand. All rights reserved.
            </p>
            <p>
              Material featured on this website may be reproduced free of charge after taking
              proper permission by sending an email to sarra@uk.gov.in. The material must be
              reproduced accurately and must not be used in a misleading context. Wherever the
              material is being published or issued to others, the source must be prominently
              acknowledged.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Government of India Standard Copyright</h2>
            <p>
              The contents of this website may not be reproduced partially or fully, without
              due permission from the Spring and River Rejuvenation Authority, Government of
              Uttarakhand. If referred to as a part of another website, the source must be
              appropriately acknowledged. The contents of this website cannot be used in any
              misleading or objectionable context.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Permission for Reproduction</h2>
            <p>
              Permission to reproduce material from this website does not extend to any material
              on this site which is identified as being the copyright of a third party. Authorization
              to reproduce such material must be obtained from the copyright holders concerned.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <p><strong>Spring and River Rejuvenation Authority (SARRA)</strong></p>
              <p>Government of Uttarakhand</p>
              <p>Dehradun, Uttarakhand, India</p>
              <p>Email: sarra@uk.gov.in</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
