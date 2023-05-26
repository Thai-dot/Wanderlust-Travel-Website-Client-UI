import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PolicyTourProps {
    policyData: any;
}

export default function PolicyTour(props: PolicyTourProps) {
    const { policyData } = props;
    return (
        <div className="about__facilities">
            <div className="item">
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontFamily : 'DM Sans', fontWeight: 'bold', fontSize: '18px'}}>Các chính sách bao gồm</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontFamily : 'DM Sans'}}>{policyData.containInformation}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="item">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontFamily : 'DM Sans', fontWeight: 'bold', fontSize: '18px'}}>Các chính sách không bao gồm</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontFamily : 'DM Sans'}}>{policyData.notContainPolicy}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="item">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontFamily : 'DM Sans', fontWeight: 'bold', fontSize: '18px'}}>Chính sách dành cho trẻ em</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontFamily : 'DM Sans'}}>{policyData.childrenPolicy}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="item">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{fontFamily : 'DM Sans', fontWeight: 'bold', fontSize: '18px'}}>Chính sách thanh toán</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{fontFamily : 'DM Sans'}}>{policyData.paymentPolicy}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
