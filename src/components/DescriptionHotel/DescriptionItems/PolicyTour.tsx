import React from 'react';

interface PolicyTourProps {
    policyData: any;
}

export default function PolicyTour(props: PolicyTourProps) {
    const { policyData } = props;

    return (
        <div className="about__facilities">
            {policyData ?? (
                <div>
                    <div className="item">
                        Tour Introduce: {policyData.introduceInformation}
                    </div>
                    <div className="item">
                        Contains: {policyData.containInformation}
                    </div>
                    <div className="item">
                        Not Contains: {policyData.notContainPolicy}
                    </div>
                    <div className="item">
                        Payment Policy: {policyData.paymentPolicy}
                    </div>
                    <div className="item">
                        Children Policy: {policyData.childrenPolicy}
                    </div>
                </div>
            )}
        </div>
    );
}
