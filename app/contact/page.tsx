import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Mithila Heritage',
  description: 'Get in touch with Mithila Heritage for inquiries and support',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you. Get in touch with us.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                <a
                  href="mailto:info@mithilaheritage.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  info@mithilaheritage.com
                </a>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+91-XXX-XXX-XXXX</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">
                  Mithila Heritage
                  <br />
                  Mithila Region
                  <br />
                  Bihar, India
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Message Info */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600 text-sm">
                  For orders, shipping, and product inquiries, please email us or call during
                  business hours.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Artisan Partnerships</h3>
                <p className="text-gray-600 text-sm">
                  Interested in partnering with us? We&apos;re always looking for talented artisans.
                  Contact us to discuss opportunities.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Your feedback helps us improve. Please share your thoughts and suggestions with
                  us.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">FAQs</h3>
                <p className="text-gray-600 text-sm">
                  Check our FAQs for common questions about shipping, returns, and more.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Other Information</h2>
          <div className="space-y-2">
            <Link
              href="/shipping-policy"
              className="block text-blue-600 hover:text-blue-800 font-medium"
            >
              Shipping & Delivery Policy
            </Link>
            <Link
              href="/return-policy"
              className="block text-blue-600 hover:text-blue-800 font-medium"
            >
              Return & Refund Policy
            </Link>
            <Link
              href="/about"
              className="block text-blue-600 hover:text-blue-800 font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
