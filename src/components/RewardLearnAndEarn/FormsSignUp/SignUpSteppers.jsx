/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import styles from "../../../styles/RewardLearnAndEarn/SignUpRewardLearnAndEarn/SignUpRewardLearnAndEarn.module.css";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#6A00A6",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#6A00A6",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    width: 100,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#DF8BE6' : '#DF8BE6',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#DF8BE6',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: "#6A00A6",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#6A00A6",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = new Array(5).fill(null);

export default function SignUpSteppers({ step }) {
  return (
    <article className={styles.articleStepper}>
      <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />} className={styles.containerStepper}>
        {steps.map((label, length) => (
          <Step className={styles.containerStep} key={length}>
            <StepLabel
              className={styles.stepLabel}
              sx={{
                fontWeight: 700,
                fontSize: 30,
              }}
              StepIconComponent={ColorlibStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </article>
  );
}
