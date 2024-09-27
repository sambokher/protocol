import React, { isValidElement, ReactNode } from "react";
import { spacingMap } from "./helpers";

type AppShellProps = {
  pageBackground?: "base-0" | "base-50" | "base-100" | "base-200" | "base-300" | "primary" | "secondary" | "accent";
  backgroundImage?: string;
  maxWidth?: "stretch" | "960" | "1200" | "1440" | "1920";
  justifyContent?: "center" | "start" | "end";
  paddingX?: "2px" | "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px" | "32px" | "48px";
  paddingY?: "2px" | "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px" | "32px" | "48px";
  children?: React.ReactNode;
  attributes?: object;
  listeners?: object;
};

export default function AppShell({
  pageBackground = "base-0",
  backgroundImage,
  maxWidth = "stretch",
  justifyContent = "center",
  paddingX,
  paddingY,
  children,
  attributes,
  listeners,
}: AppShellProps) {
  const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ""}${paddingY ? ` py-${spacingMap[paddingY]}` : ""}`;
  const fontColor = pageBackground?.startsWith("base") ? "base-content" : `${pageBackground}-content`;
  const pageBgColor = `bg-${pageBackground}`;
  const fontColorValue = `text-${fontColor}`;
  
  
  const mainClasses = `relative flex flex-col w-full items-stretch flex-grow min-h-full`;
  const groupedChildren: Record<string, ReactNode[]> = {
    Header: [],
    Hero: [],
    IconBar: [],
    Sidebar: [],
    FeaturePanel: [],
    MainArea: [],
    Footer: [],
  };

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    //@ts-expect-error make proper types here
    const childName = child.type.__juno_name;
    const group = Object.keys(groupedChildren).includes(childName) ? childName : "MainArea";
    groupedChildren[group].push(child);
  });

  const { Header, Hero, Footer, MainArea, IconBar, Sidebar, FeaturePanel } = groupedChildren;
  
  const imageStyles = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } : {};
  
  return (
    <div 
    {...attributes} {...listeners} 
    className={`relative flex flex-col w-screen h-dvh flex-grow ${pageBgColor} ${fontColorValue}`}
    style={{ ...imageStyles }}
    
    >
      <div
        className={`relative flex flex-row w-full items-stretch flex-grow min-h-full self-${justifyContent} ${paddingStyles}`}
        style={{ width: "100%", maxWidth: maxWidth != "stretch" ? `${maxWidth}px` : "100%" }}
      >
        {IconBar}
        {Sidebar}
        {FeaturePanel}
        <div className={mainClasses} style={{ minHeight: "100%" }}>
          {Header}
          {Hero}
          <div className={`flex flex-row flex-grow w-full h-full justify-${justifyContent}`}>{MainArea}</div>
          {Footer}
        </div>
      </div>
    </div>
  );
}
