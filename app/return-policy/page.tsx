import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Return Policy | Mithila Heritage',
  description: 'Read our return and refund policy',
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return & Refund Policy</h1>
          <p className="text-lg text-gray-600">
            We want you to be completely satisfied with your purchase
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Window</h2>
            <p className="text-gray-600 mb-3">
              You can return or exchange products within 7 days from the date of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility for Returns</h2>
            <p className="text-gray-600 mb-4">Products are eligible for return if:</p>
            <ul className="space-y-3 text-gray-600 ml-4">
              <li>• The product is unused and in original condition</li>
              <li>• All original packaging and tags are intact</li>
              <li>• The return is initiated within 7 days of delivery</li>
              <li>• The product is not damaged due to misuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Returnable Items</h2>
            <p className="text-gray-600 mb-4">The following items cannot be returned:</p>
            <ul className="space-y-3 text-gray-600 ml-4">
              <li>• Food items (unless damaged during delivery)</li>
              <li>• Used or damaged products</li>
              <li>• Items without original packaging</li>
              <li>• Products damaged due to mishandling</li>
              <li>• Items returned after 7 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Process</h2>
            <ol className="space-y-4 text-gray-600 ml-4">
              <li>
                <strong>Step 1:</strong> Contact us at{' '}
                <a href="mailto:info@mithilaheritage.com" className="text-blue-600 hover:text-blue-800">
                  info@mithilaheritage.com
                </a>{' '}
                with your order number and reason for return
              </li>
              <li>
                <strong>Step 2:</strong> We&apos;ll verify your return request within 24 hours
              </li>
              <li>
                <strong>Step 3:</strong> We&apos;ll provide you with prepaid return shipping label
              </li>
              <li>
                <strong>Step 4:</strong> Pack the item securely and drop it at the courier pickup point
              </li>
              <li>
                <strong>Step 5:</strong> Once received and verified, refund will be processed
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
            <div className="bg-gray-50 rounded p-4 mb-4">
              <p className="text-gray-600 mb-3">
                <strong>Refund Timeline:</strong>
              </p>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Item received and verified: 1-2 days</li>
                <li>• Refund initiated: 5-7 business days after verification</li>
                <li>• Refund credited to source: 3-5 business days</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
            <p className="text-gray-600 mb-3">
              We offer exchanges for defective or damaged products within 7 days of delivery.
            </p>
            <ol className="space-y-2 text-gray-600 ml-4">
              <li>1. Contact us with photos of the damaged product</li>
              <li>2. Once verified, we&apos;ll send a replacement</li>
              <li>3. Return the defective product using the prepaid label</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Deductions</h2>
            <p className="text-gray-600 mb-3">
              The following may result in deduction from your refund:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>• Return shipping charges (if applicable)</li>
              <li>• Damage charges (if item is damaged during return)</li>
              <li>• Discounts applied at purchase (non-refundable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged Products on Delivery</h2>
            <p className="text-gray-600 mb-3">
              If you receive a damaged product:
            </p>
            <ol className="space-y-2 text-gray-600 ml-4">
              <li>1. Report within 48 hours with photos</li>
              <li>2. We&apos;ll offer replacement or full refund</li>
              <li>3. No return shipping required</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-3">
              For return and refund inquiries:
            </p>
            <ul className="space-y-2 text-gray-600 ml-4">
              <li>Email:{' '}
                <a href="mailto:info@mithilaheritage.com" className="text-blue-600 hover:text-blue-800">
                  info@mithilaheritage.com
                </a>
              </li>
              <li>Phone: +91-XXX-XXX-XXXX</li>
              <li>Hours: Monday-Friday, 9 AM - 6 PM</li>
            </ul>
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
            href="/shipping-policy"
            className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-gray-900 mb-2">Shipping & Delivery Policy</h3>
            <p className="text-gray-600 text-sm">Learn about our shipping process</p>
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
