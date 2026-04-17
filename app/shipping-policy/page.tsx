import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping Policy | Mithila Heritage',
  description: 'Read our shipping and delivery policy',
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery Policy</h1>
          <p className="text-lg text-gray-600">
            Clear and transparent shipping information
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Areas</h2>
            <p className="text-gray-600 mb-3">
              We deliver to all locations across India. Orders are typically delivered within 5-7
              business days.
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• All major cities and towns</li>
              <li>• Remote areas (delivery may take longer)</li>
              <li>• PIN codes are required for delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
            <div className="bg-gray-50 rounded p-4 mb-4">
              <p className="text-gray-600 mb-2">
                <strong>Free Delivery:</strong> On orders worth ₹499 and above
              </p>
              <p className="text-gray-600">
                <strong>Delivery Charge:</strong> ₹60 for orders below ₹499
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
            <ol className="space-y-3 text-gray-600 ml-4">
              <li>1. Order confirmation via email/SMS</li>
              <li>2. Payment processing (1-2 business days)</li>
              <li>3. Order packaging and dispatch (2-3 business days)</li>
              <li>4. Tracking information sent to your phone</li>
              <li>5. Delivery at your doorstep</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
            <p className="text-gray-600 mb-3">
              Once your order is dispatched, you&apos;ll receive a tracking number via SMS and email.
              You can track your package in real-time using this number on the courier partner&apos;s
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Attempts</h2>
            <p className="text-gray-600 mb-3">
              Our courier partners make up to 2 delivery attempts. If you&apos;re not available:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• First attempt - delivery to your address</li>
              <li>• Second attempt - after contacting you</li>
              <li>• If unsuccessful, package is returned to sender</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Lost Packages</h2>
            <p className="text-gray-600 mb-3">
              In case of damage or loss during transit:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• Report within 48 hours of delivery</li>
              <li>• Provide photos and order details</li>
              <li>• Full refund or replacement will be arranged</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Instructions</h2>
            <p className="text-gray-600 mb-3">
              You can add special delivery instructions during checkout:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• Delivery gate instructions</li>
              <li>• Nearby landmark details</li>
              <li>• Preferred delivery time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              For shipping inquiries or issues, please contact us at{' '}
              <a href="mailto:info@mithilaheritage.com" className="text-blue-600 hover:text-blue-800">
                info@mithilaheritage.com
              </a>
            </p>
          </section>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <Link
            href="/return-policy"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-2">Return & Refund Policy</h3>
            <p className="text-gray-600 text-sm">Learn about our return and refund process</p>
          </Link>

          <Link
            href="/contact"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
            <p className="text-gray-600 text-sm">Get in touch for any questions or concerns</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
