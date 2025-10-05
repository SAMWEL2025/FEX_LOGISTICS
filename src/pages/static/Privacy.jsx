import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faUserShield, faDatabase, faMapMarkerAlt, faSearch, faGlobe, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Fex Logistics has meticulously crafted this Privacy Policy to provide a comprehensive explanation of our policies concerning the collection and utilization of personal information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Fex Logistics. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="text-gray-700 mb-4">
              Fex Logistics has meticulously crafted this Privacy Policy to provide a comprehensive explanation of our policies concerning the collection and utilization of personal information. This policy specifically pertains to the data we gather from our customers and users who engage with the various services we offer, including the interactions that occur on Fex Logistics websites. Our aim is to ensure transparency and to build trust by clearly outlining how your personal information is handled and safeguarded throughout your experience with us.
            </p>
            <p className="text-gray-700">
              This Privacy Policy applies to all information collected by or submitted to Fex Logistics through our website, 
              mobile applications, services, and interactions with our company.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faShieldAlt} className="text-red-600 mr-3" />
              Data Protection
            </h2>
            <p className="text-gray-700">
              This Privacy Policy governs all personal data processing carried out via websites managed by Fex Logistics which is Fex-Global Logistics Limited, with registered offices at Lagos, Nigeria. We are committed to protecting your personal information and ensuring its security in compliance with applicable data protection laws.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faUserShield} className="text-red-600 mr-3" />
              Personal Data Processed
            </h2>
            <p className="text-gray-700 mb-4">
              When offering services to customers, users, or consignees, whether these are through physical retail locations, various websites, or digital platforms, it is essential to prioritize comprehensive and personalized service to ensure a seamless and satisfying experience.
            </p>
            <p className="text-gray-700">
              Our aim is to gather and manage information about customers, users, or consignees as individuals. This involves collecting data that enables their identification, either on its own or when combined with other readily available information. This process entails gathering information that makes it possible to identify individuals, either independently or when combined with other easily accessible data. Such information is often termed "Personal Data" and can be acquired by Fex Logistics in various ways. For instance, it might be collected when customers, users, or consignees voluntarily provide it—such as during the account sign up process on an Fex Logistics platform, when they initiate an order for delivery services, or when completing shipping documents at the company's outlet locations.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faLock} className="text-red-600 mr-3" />
              Name, Contact Details and Other Personal Data
            </h2>
            <p className="text-gray-700 mb-4">
              When you visit a physical outlet of Fex Logistics and request their services, you will be required to provide certain Personal Data related to your identity. This information may encompass your full name, which helps in personalized service and record maintenance.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Name</li>
              <li>Surname</li>
              <li>Telephone number</li>
              <li>Email</li>
              <li>Address</li>
            </ul>
            <p className="text-gray-700 mt-4">
              On different parts of the Fex Logistics website, particularly on pages dedicated to account creation and various forms, you will find requests to provide Personal Data related to yourself. In some instances, you may be asked to provide further personal information that pertains specifically to you.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mr-3" />
              Data Related to Your Location
            </h2>
            <p className="text-gray-700">
              Once you visit our website or app, you may be asked for your consent to allow accessing your Device's location, only when you're on our website, this enables your Device's map functionalities. This is meant to allow Fex Logistics to provide more precise and useful Services when using our platforms. If this is too invasive, you can always revoke the sharing of your position from your Device settings and provide a detailed physical address.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faSearch} className="text-red-600 mr-3" />
              Shipment Inspection
            </h2>
            <p className="text-gray-700">
              Fex Logistics may be required to physically inspect the shipments which are to be delivered in its possession. These inspections may be carried out by our staff only to detect whether the shipment has any illegal substance.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="text-red-600 mr-3" />
              Transfer of Personal Data (Delivery Purpose)
            </h2>
            <p className="text-gray-700 mb-4">
              Considering Fex Logistics presence and business operations, your Personal Data may be transferred to third parties located in several different states and countries. In particular, whenever you rely on Fex Logistics Services for any International, Local, Nationwide operations. Personal Data may be transferred for the usefulness of delivery.
            </p>
            <p className="text-gray-700">
              We are committed to protecting your privacy by not sharing your personal data with any third parties in a manner that could expose any identifiable information. This exception is made solely to facilitate and guarantee successful last mile delivery, ensuring that your services or products reach you effectively and securely.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faBalanceScale} className="text-red-600 mr-3" />
              Release Data for Legal Purposes
            </h2>
            <p className="text-gray-700 mb-4">
              There are occasions when Fex Logistics might find it essential or advantageous, for legal reasons, to disclose your personal information in response to a formal request from either a government agency or a party involved in a private lawsuit. By agreeing to our terms, you consent to us sharing your information with a third party when we sincerely believe it's necessary for the advancement of a civil lawsuit, to aid in a criminal investigation, or to address other legal issues.
            </p>
            <p className="text-gray-700">
              By agreeing to these terms, you acknowledge that you hold us harmless from any liability associated with the disclosure of your information in response to requests made by law enforcement authorities or private legal parties. We assure you that any sharing of your personal data for legal reasons will be conducted strictly in accordance with the applicable laws governing the country where you reside.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faDatabase} className="text-red-600 mr-3" />
              Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Secure servers and encryption technologies</li>
              <li>Regular security assessments and vulnerability testing</li>
              <li>Restricted access to personal information</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 mt-4">
              However, no method of transmission over the internet or method of electronic storage is 100% secure. 
              While we strive to use commercially acceptable means to protect your personal information, we cannot 
              guarantee its absolute security.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccuracies in your personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for use by children under the age of 18. We do not knowingly collect 
              personal information from children under 18. If we become aware that we have collected personal 
              information from children without verification of parental consent, we will take steps to remove that 
              information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Amendments</h2>
            <p className="text-gray-700 mb-4">
              This Privacy Policy came into effect on March 25, 2025. Fex Logistics has the authority to modify or completely change the terms of this Privacy Policy, or to update its contents, at any time, with or without seeking your approval.
            </p>
            <p className="text-gray-700">
              Fex Logistics is committed to keeping you informed about any significant changes to our services or policies. As soon as these changes are implemented, you will be promptly notified through an update on our website or by receiving a direct email notification. This ensures that all customers and users are fully aware and up-to-date with the latest developments from our company.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-semibold">Email:</span> support@fexlogistics.com.ng</li>
              <li><span className="font-semibold">Phone:</span> 09015179909 / 07046674299</li>
              <li><span className="font-semibold">Address:</span> No.25 Osolo way Ajao. Off Airport Rd Lagos. Nigeria</li>
            </ul>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;