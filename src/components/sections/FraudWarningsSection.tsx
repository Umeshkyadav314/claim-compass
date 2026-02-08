import React from 'react';
import { FormSection } from '../form/FormSection';
import { ChevronDown } from 'lucide-react';

const fraudWarnings = [
  { state: 'Alabama', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or who knowingly presents false information in an application for insurance is guilty of a crime and may be subject to restitution, fines, or confinement in prison, or any combination thereof.' },
  { state: 'Alaska', text: 'A person who knowingly and with intent to injure, defraud, or deceive an insurance company files a claim containing false, incomplete, or misleading information may be prosecuted under state law.' },
  { state: 'Arizona', text: 'For your protection Arizona law requires the following statement to appear on this form. Any person who knowingly presents a false or fraudulent claim for payment of a loss is subject to criminal and civil penalties.' },
  { state: 'Arkansas', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
  { state: 'California', text: 'For your protection California law requires the following to appear on this form. Any person who knowingly presents false or fraudulent claim for the payment of a loss is guilty of a crime and may be subject to fines and confinement in state prison.' },
  { state: 'Colorado', text: 'It is unlawful to knowingly provide false, incomplete, or misleading facts or information to an insurance company for the purpose of defrauding or attempting to defraud the company. Penalties may include imprisonment, fines, denial of insurance and civil damages.' },
  { state: 'Delaware', text: 'Any person who knowingly, and with intent to injure, defraud or deceive any insurer, files a statement of claim containing any false, incomplete or misleading information is guilty of a felony.' },
  { state: 'District of Columbia', text: 'WARNING: It is a crime to provide false or misleading information to an insurer for the purpose of defrauding the insurer or any other person. Penalties include imprisonment and/or fines.' },
  { state: 'Florida', text: 'Any person who knowingly and with intent to injure, defraud, or deceive any insurer files a statement of claim containing any false, incomplete, or misleading information is guilty of a felony of the third degree.' },
  { state: 'Hawaii', text: 'Any person who intentionally or knowingly misrepresents or conceals material facts, opinions, intention, or law to obtain or attempt to obtain coverage, benefits, recovery, or compensation commits the offense of insurance fraud which is a crime punishable by fines or imprisonment or both.' },
  { state: 'Idaho', text: 'Any person who knowingly, and with intent to defraud or deceive any insurance company, files a statement containing any false, incomplete or misleading information is guilty of a felony.' },
  { state: 'Indiana', text: 'A person who knowingly and with intent to defraud an insurer files a statement of claim containing any false, incomplete, or misleading information commits a felony.' },
  { state: 'Kansas', text: 'Any person who, knowingly and with intent to defraud, presents, causes to be presented or prepares with knowledge or belief that it will be presented to or by an insurer, any written statement as part of a claim for payment which such person knows to contain materially false information commits a fraudulent insurance act.' },
  { state: 'Kentucky', text: 'Any person who knowingly and with intent to defraud any insurance company or other person files a statement of claim containing any materially false information or conceals information concerning any fact material thereto commits a fraudulent insurance act, which is a crime.' },
  { state: 'Louisiana', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
  { state: 'Maine', text: 'It is a crime to knowingly provide false, incomplete or misleading information to an insurance company for the purpose of defrauding the company. Penalties may include imprisonment, fines or denial of insurance benefits.' },
  { state: 'Maryland', text: 'Any person who knowingly or willfully presents a false or fraudulent claim for payment of a loss or benefit or who knowingly or willfully presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
  { state: 'Michigan', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
  { state: 'Minnesota', text: 'A person who files a claim with intent to defraud or helps commit a fraud against an insurer is guilty of a crime.' },
  { state: 'Nevada', text: 'Pursuant to NRS 686A.291, any person who knowingly and willfully files a statement of claim that contains any false, incomplete or misleading information concerning a material fact is guilty of a category D felony.' },
  { state: 'New Hampshire', text: 'Any person who, with a purpose to injure, defraud or deceive any insurance company, files a statement of claim containing any false, incomplete or misleading information is subject to prosecution and punishment for insurance fraud as provided in RSA 638:20.' },
  { state: 'New Jersey', text: 'Any person who knowingly files a statement of claim containing any false or misleading information is subject to criminal and civil penalties.' },
  { state: 'New Mexico', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to civil fines and criminal penalties.' },
  { state: 'New York', text: 'Any person who knowingly makes or knowingly assists, abets, solicits or conspires with another to make a false report of the theft, destruction, damage or conversion of any motor vehicle to a law enforcement agency, the department of motor vehicles or an insurance company, commits a fraudulent insurance act, which is a crime.' },
  { state: 'Ohio', text: 'Any person who, with intent to defraud or knowing that he is facilitating a fraud against an insurer, submits an application or files a claim containing a false or deceptive statement is guilty of insurance fraud.' },
  { state: 'Oklahoma', text: 'WARNING: Any person who knowingly, and with intent to injure, defraud or deceive any insurer, makes any claim for the proceeds of an insurance policy containing any false, incomplete or misleading information is guilty of a felony.' },
  { state: 'Oregon', text: 'Any person who knowingly and with intent to defraud or solicit another to defraud the insurer by submitting an application containing a false statement as to any material fact may be violating state law.' },
  { state: 'Pennsylvania', text: 'Any person who knowingly and with intent to injure or defraud any insurer files an application or claim containing any false, incomplete or misleading information shall, upon conviction, be subject to imprisonment for up to seven years and the payment of a fine of up to $15,000.' },
  { state: 'Puerto Rico', text: 'Any person who knowingly and with the intention of defrauding presents false information in an insurance application, or presents a fraudulent claim for the payment of a loss or any other benefit, shall incur a felony and shall be sanctioned for each violation by a fine of not less than $5,000 and not more than $10,000, or imprisonment for three years, or both.' },
  { state: 'Rhode Island', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
  { state: 'Tennessee', text: 'It is a crime to knowingly provide false, incomplete or misleading information to an insurance company for the purpose of defrauding the company. Penalties include imprisonment, fines and denial of insurance benefits.' },
  { state: 'Texas', text: 'Any person who knowingly presents a false or fraudulent claim for the payment of a loss is guilty of a crime and may be subject to fines and confinement in state prison.' },
  { state: 'Virginia', text: 'It is a crime to knowingly provide false, incomplete or misleading information to an insurance company for the purpose of defrauding the company. Penalties include imprisonment, fines and denial of insurance benefits.' },
  { state: 'Washington', text: 'It is a crime to knowingly provide false, incomplete or misleading information to an insurance company for the purpose of defrauding the company. Penalties include imprisonment, fines and denial of insurance benefits.' },
  { state: 'West Virginia', text: 'Any person who knowingly presents a false or fraudulent claim for payment of a loss or benefit or knowingly presents false information in an application for insurance is guilty of a crime and may be subject to fines and confinement in prison.' },
];

export const FraudWarningsSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <FormSection title="Fraud Warnings by State">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Click to {isExpanded ? 'hide' : 'view'} state-specific fraud warnings</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="mt-4 max-h-96 overflow-y-auto space-y-4 text-xs">
          {fraudWarnings.map((warning) => (
            <div key={warning.state} className="border-b border-form-border pb-3 last:border-0">
              <p>
                <span className="font-semibold text-foreground">Applicable in {warning.state}: </span>
                <span className="text-muted-foreground">{warning.text}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </FormSection>
  );
};
