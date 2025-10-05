import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faTruck, faHandshake, faGavel, faCopyright, faLink, faBox, faKeyboard, faGlobe, faMoneyBill, faShippingFast, faFileInvoiceDollar, faExclamationTriangle, faBalanceScale, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl max-w-2xl mx-auto">
            The terms and conditions outlined for Fex Logistics website, www.fexlogistics.com.ng, are established to govern the use of the Website by all users.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Fex Logistics. These Terms of Service ("Terms") govern your use of our website, services, 
              and applications (the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 mb-4">
              The terms and conditions outlined for Fex Logistics website, www.fexlogistics.com.ng, are established to govern the use of the Website by all users, referred to herein as "you" and "your." These terms provide a comprehensive framework that delineates the rights and responsibilities of every individual visiting or interacting with the site, ensuring a consistent and fair usage policy for all parties involved.
            </p>
            <p className="text-gray-700 mb-4">
              These terms and conditions, the Privacy Policy and any other relevant policies on the website, constitute the entire agreement between you and Fex Logistics regarding your use of the Website.
            </p>
            <p className="text-gray-700">
              If you do not agree or feel good about these terms and conditions, then you must stop using or accessing the Website.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faCopyright} className="text-red-600 mr-3" />
              Intellectual Property Rights
            </h2>
            <p className="text-gray-700">
              The entirety of intellectual property rights associated with the contents of this Website is owned by Fex Logistics, its affiliates, or its licensors and is protected by copyright, trademark, and other applicable laws.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faFileContract} className="text-red-600 mr-3" />
              Use of Website
            </h2>
            <p className="text-gray-700 mb-4">
              By using our Services, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>You have the legal capacity and agree to comply with these Terms</li>
              <li>You are not a minor in the jurisdiction in which you reside</li>
              <li>You will not access our Services through automated or non-human means</li>
              <li>You will not use our Services for any illegal or unauthorized purpose</li>
              <li>Your use of the Services will not violate any applicable law or regulation</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You may not use any program, algorithm or methodology process to copy or monitor any portion of the Website.
            </p>
            <p className="text-gray-700">
              You must refrain from trying to gain unauthorized access to any part or feature of the Website, as well as any systems or networks linked to it, or any services provided on or via the Website, by using hacking, password "mining," or any other unlawful methods. Additionally, the use of unauthorized scripting technologies to extract information from the Website or to submit information is strictly forbidden.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faLink} className="text-red-600 mr-3" />
              Linking Sites
            </h2>
            <p className="text-gray-700">
              The Website's content may feature links to external third-party websites, referred to as "Linked Sites." These links are offered solely for your convenience, facilitating easier navigation, but please note that they are beyond the jurisdiction and control of Fex Logistics.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faBox} className="text-red-600 mr-3" />
              Submitted Shipment/Materials
            </h2>
            <p className="text-gray-700 mb-4">
              You may submit shipment/material through the Website provided.
            </p>
            <p className="text-gray-700 mb-4">
              You grant Fex Logistics a non-exclusive, royalty-free, perpetual, irrevocable and fully transferable license to use, reproduce, modify, adapt, publish, translate, create derivative works from shipment/materials received, distribute and display your submitted shipment/material throughout the world in any of our media.
            </p>
            <p className="text-gray-700">
              You acknowledge that there is no duty of confidentiality concerning the material submitted.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faKeyboard} className="text-red-600 mr-3" />
              Data Entry
            </h2>
            <p className="text-gray-700 mb-4">
              Fex Logistics reserves the right to retain any information you furnish while using the Website, in alignment with our Privacy Policy. You recognize that Fex Logistics may erase this data at any moment.
            </p>
            <p className="text-gray-700">
              Furthermore, you acknowledge that the responsibility to maintain a backup copy of such data rests solely with you, and Fex Logistics shall not be held accountable for its loss or deletion.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="text-red-600 mr-3" />
              Export
            </h2>
            <p className="text-gray-700">
              You bear full responsibility for adhering to all laws and regulations of any country from which you access the Website, concerning the access, use, export, and import of any content displayed on or accessible through the Website.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faTruck} className="text-red-600 mr-3" />
              Services
            </h2>
            <p className="text-gray-700 mb-4">
              Fex Logistics provides a range of logistics and delivery services including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Express International delivery</li>
              <li>Cargo shipping</li>
              <li>E-commerce logistics solutions</li>
              <li>Local delivery services</li>
              <li>Interstate delivery</li>
              <li>B2B logistics</li>
              <li>Air/sea freight</li>
              <li>Relocation services</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We reserve the right to refuse service to anyone for any reason at any time.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faMoneyBill} className="text-red-600 mr-3" />
              Charges/Prices
            </h2>
            <p className="text-gray-700 mb-4">
              To the best of Fex Logistics' knowledge, all prices displayed on the Website are accurate at the time of publication. However, the Website may inadvertently contain inaccuracies or typographical errors. These will be rectified at Fex Logistics' discretion as they are discovered.
            </p>
            <p className="text-gray-700 mb-4">
              Fex Logistics reserves the right at any time to change its fee or give discount access to certain parts of the Website.
            </p>
            <p className="text-gray-700">
              You also recognize and consent that any rate or time projection displayed by the Rate Calculator, the Transit Time Estimator, or any similar tool on the Website serves merely as an estimate and may differ from the actual rates. This may be due to change in actual dimensions of your shipments.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faMoneyBill} className="text-red-600 mr-3" />
              Extra Cost
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><span className="font-semibold">Change in Weight or Dimensions:</span> Extra costs may arise if there is a discrepancy between the initial weight and dimensions provided and the actual weight and dimensions upon receiving or when the rate is shared.</li>
              <li><span className="font-semibold">Change in Delivery Address:</span> If there is a change in the delivery address after an agreement or booking, additional charges could be applied, potentially due to changes in distance or logistical requirements.</li>
              <li><span className="font-semibold">Changes in Governmental Policy:</span> Any alterations in governmental regulations, policies, or customs procedures at the destination or origin of the item being delivered could result in extra costs. This could include taxes, tariffs, or specific regional restrictions.</li>
              <li><span className="font-semibold">Reroute Requests:</span> Extra cost can be driven once there is change in Destination by shipper/recipient requesting for (Reroute) of Item once received or upon Delivery.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide accurate and complete information. 
              You are solely responsible for the activity that occurs on your account, and you must keep 
              your account password secure.
            </p>
            <p className="text-gray-700">
              You must notify us immediately upon becoming aware of any breach of security or unauthorized 
              use of your account.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipment Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Prohibited Items</h3>
                <p className="text-gray-700 mb-2">
                  You may not use our Services to ship any items that are illegal, hazardous, or prohibited by law. 
                  Prohibited items include but are not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Illegal drugs and controlled substances</li>
                  <li>Weapons and ammunition</li>
                  <li>Hazardous materials</li>
                  <li>Perishable items without proper packaging</li>
                  <li>Live animals</li>
                  <li>Human remains</li>
                  <li>Stolen property</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Packaging Requirements</h3>
                <p className="text-gray-700">
                  All shipments must be properly packaged to prevent damage during transit. We reserve the right to 
                  refuse any shipment that is not properly packaged or labeled.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Delivery Times</h3>
                <p className="text-gray-700">
                  While we make every effort to deliver shipments within the estimated timeframes, delivery times 
                  are not guaranteed and may be affected by factors beyond our control such as weather, customs 
                  delays, or other unforeseen circumstances.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faShippingFast} className="text-red-600 mr-3" />
              Carrier Obligations
            </h2>
            <p className="text-gray-700">
              Once Fex Logistics, serving as either the carrier or an independent third-party provider, has successfully delivered the goods to the designated recipient noted on the shipment invoice—whether at the receiver's specified address or at an alternate location—the carrier has fully met its contractual obligation.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-red-600 mr-3" />
              Duties and Taxes
            </h2>
            <p className="text-gray-700 mb-4">
              Please be advised that upon reaching the destination country, your items may be subject to customs duties and taxes, which are determined by the local customs authorities and are non-negotiable.
            </p>
            <p className="text-gray-700 mb-4">
              Fex Logistics is unable to manage or influence these fees because the tariffs are set according to the regulations and policies of the customs authorities in the destination country.
            </p>
            <p className="text-gray-700 mb-4">
              Fex Logistics will not be held accountable for any delays that occur as a result of procedures or inspections conducted by customs officials at border crossings.
            </p>
            <p className="text-gray-700">
              Both the sender and the receiver must ensure that all the necessary paperwork and documentation required for the customs clearance process are thoroughly prepared and provided, facilitating a smoother transition through international borders. If either the Sender or the Receiver does not fulfill this requirement, the Sender will incur the cost associated with sending the shipment back to its original location.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 mr-3" />
              Claims
            </h2>
            <p className="text-gray-700 mb-4">
              If you need to file a claim for a loss that involves a parcel being mis-delivered or for a shipment that has sustained damage (Value declared), you should ensure that you gather all relevant documentation, such as proof of shipment, delivery receipts, and photographs of any damage. With this information, you can contact the customer service department of the delivery company (Fex Logistics) to initiate the claims process. Be sure to provide detailed information about the issue and any supporting evidence to expedite the resolution of your claim.
            </p>
            <p className="text-gray-700 mb-4">
              To process your claim efficiently, you must send us a mail that includes substantial proof for the claim. Additionally, it is crucial that we receive your claim documentation within our premises either at the time of collection or during the delivery process.
            </p>
            <p className="text-gray-700">
              Please be informed that for claims regarding damaged or lost shipments, the resolution process requires a considerable amount of time, as a thorough investigation will be conducted to ensure all aspects of the situation are adequately reviewed and addressed.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faBox} className="text-red-600 mr-3" />
              Perishable Items
            </h2>
            <p className="text-gray-700">
              If the receiver is not immediately available to accept a shipment containing perishable goods upon its arrival, the responsibility for any issues, such as spoilage or delays, may not fall on Fex Logistics.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faBalanceScale} className="text-red-600 mr-3" />
              Dispute Clause
            </h2>
            <p className="text-gray-700">
              By consenting to these terms, both parties acknowledge that, in case of any disagreement or conflict, they will initially strive to settle the issue through direct and open communication. If these negotiations do not result in a resolution, the involved parties are committed to pursuing mediation as a next step, in an effort to find a mutually satisfactory solution. Only if both negotiation and mediation fail to resolve the matter, will litigation be considered as a final recourse.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faHandshake} className="text-red-600 mr-3" />
              Payment Terms
            </h2>
            <p className="text-gray-700 mb-4">
              Payment for our Services must be made in accordance with the pricing and payment terms displayed 
              on our website or as otherwise communicated to you.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>All prices are subject to change without notice</li>
              <li>Payment must be received before services are rendered</li>
              <li>We reserve the right to suspend or terminate services for non-payment</li>
              <li>Additional fees may apply for special handling, customs clearance, or other services</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faShieldAlt} className="text-red-600 mr-3" />
              Liability
            </h2>
            <p className="text-gray-700">
              Fex Logistics is committed to making every reasonable effort to deliver your shipment in accordance with our regular delivery schedules, striving to meet your expectations as efficiently as possible.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall Fex Logistics, its directors, employees, or affiliates be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses.
            </p>
            <p className="text-gray-700">
              Our total liability for any claim related to the Services shall not exceed the amount you paid to us 
              for the Services giving rise to the claim.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold Fex Logistics and its affiliates, directors, employees, and agents 
              harmless from any claim, demand, or damage, including reasonable attorneys' fees, made by any third 
              party due to or arising out of your breach of these Terms or your violation of any law or the rights 
              of a third party.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FontAwesomeIcon icon={faGavel} className="text-red-600 mr-3" />
              Termination
            </h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior 
              notice or liability, under our sole discretion, for any reason whatsoever, including without limitation 
              if you breach the Terms.
            </p>
            <p className="text-gray-700">
              Upon termination, your right to use the Service will cease immediately.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard 
              to its conflict of law provisions.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
              revision is material, we will try to provide at least 30 days notice prior to any new terms taking 
              effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us:
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

export default Terms;