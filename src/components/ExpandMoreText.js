import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ExpandMoreText(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={
                        <>
                            <ExpandMoreIcon />
                            <SettingsIcon />
                        </>
                    }
                    
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} style={{
                        wordWrap: "break-word",

                    }}>



                        {props?.title}

                    </Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                    <Typography style={{
                        wordWrap: "break-word"

                    }}>


                        {props.description}


                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}