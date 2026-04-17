import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Mithila Heritage',
  description: 'Learn about our mission to preserve and promote Mithila heritage products',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Preserving and promoting authentic Mithila heritage
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Mithila Heritage is dedicated to preserving and promoting the rich cultural heritage
            of Mithila region. We work directly with local artisans to bring authentic, handmade
            products to customers worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our platform connects artisans with customers who appreciate traditional craftsmanship
            and authentic cultural products. Every purchase supports the livelihoods of these
            talented artisans and helps preserve their traditions for future generations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                <strong>Authentic Food Products:</strong> Traditional Mithila food specialties and
                delicacies
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                <strong>Traditional Clothing:</strong> Handwoven and embroidered garments
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                <strong>Handicrafts:</strong> Beautiful handcrafted items including art, pottery,
                and more
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>
                <strong>Festival Packs:</strong> Special collections for festivals and celebrations
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Mithila Heritage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Direct from Artisans</h3>
              <p className="text-gray-600 text-sm">
                We work directly with artisans, ensuring fair prices and authentic products
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">
                Every product is carefully selected and verified for authenticity and quality
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm">
                Your purchases directly support artisan communities and preserve cultural heritage
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Reliable Shipping</h3>
              <p className="text-gray-600 text-sm">
                Fast, secure delivery across India with free shipping on orders above ₹499
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? We&apos;d love to hear from you. Contact us for any inquiries or
            feedback.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
