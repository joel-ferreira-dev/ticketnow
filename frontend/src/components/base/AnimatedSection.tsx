"use client";
import React, { ReactNode } from "react";
import { Box, BoxProps, styled, keyframes } from "@mui/material";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionWrapper = styled(Box)<{ delay?: number }>(({ delay = 0 }) => ({
    opacity: 0,
    animation: `${fadeInUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    animationDelay: `${delay}ms`,
}));

interface AnimatedSectionProps extends BoxProps {
    children: ReactNode;
    delay?: number;
}

/**
 * A layout component that applies a staggered reveal animation to its content.
 * Essential for the "Wow" factor and premium feel.
 */
export default function AnimatedSection({ children, delay, ...props }: AnimatedSectionProps) {
    return (
        <SectionWrapper delay={delay} {...props}>
            {children}
        </SectionWrapper>
    );
}
