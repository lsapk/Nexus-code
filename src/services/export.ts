import JSZip from 'jszip';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export async function exportProject(blueprint: any) {
  const zip = new JSZip();

  // Basic project structure
  zip.file("package.json", JSON.stringify({
    name: blueprint.appName?.toLowerCase().replace(/\s/g, '-') || "nexus-generated-app",
    version: "1.0.0",
    main: "index.ts",
    dependencies: {
      "expo": "~54.0.0",
      "react": "19.1.0",
      "react-native": "0.81.5",
      "nativewind": "^4.1.23",
      "react-native-reanimated": "4.1.1",
      "lucide-react-native": "^0.542.0",
      "expo-blur": "~15.0.0",
      "react-native-safe-area-context": "~5.6.0",
      "react-native-screens": "~4.16.0"
    }
  }, null, 2));

  zip.file("App.tsx", generateAppCode(blueprint));
  zip.file("global.css", "@tailwind base;\n@tailwind components;\n@tailwind utilities;");
  zip.file("tailwind.config.js", "module.exports = { content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'], presets: [require('nativewind/preset')] };");
  zip.file("babel.config.js", "module.exports = function(api) { api.cache(true); return { presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'], plugins: ['react-native-reanimated/plugin'] }; };");

  // Generate the zip
  const content = await zip.generateAsync({ type: "base64" });
  const filename = `${(FileSystem as any).documentDirectory || ''}${blueprint.appName?.replace(/\s/g, '_') || 'project'}.zip`;

  await FileSystem.writeAsStringAsync(filename, content, {
    encoding: (FileSystem as any).EncodingType?.Base64 || 'base64',
  });

  await Sharing.shareAsync(filename);
}

function generateAppCode(blueprint: any) {
  const renderNode = (node: any): string => {
    if (!node) return '';
    const { type, props = {}, children, text } = node;

    // Props construction
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    if (type === 'Text') {
      return `<Text ${propsString}>${text || ''}</Text>`;
    }

    if (type === 'Icon') {
        return `<Icon ${propsString} />`;
    }

    const childrenCode = Array.isArray(children)
      ? children.map(child => renderNode(child)).join('\n')
      : (children ? renderNode(children) : '');

    return `<${type} ${propsString}>\n${childrenCode}\n</${type}>`;
  };

  return `
import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { icons } from 'lucide-react-native';
import "./global.css";

// Mock/Simple Components for Generated App
const GlassCard = ({ children, className }: any) => <View className={"bg-white/5 rounded-3xl border border-white/10 overflow-hidden " + (className || "")}>{children}</View>;
const BlurButton = ({ children, className }: any) => <TouchableOpacity className={"bg-white/10 rounded-2xl py-3 px-6 " + (className || "")}>{children}</TouchableOpacity>;
const SmoothStack = ({ children, spacing = 4, horizontal = false, className }: any) => (
  <View className={\`\${horizontal ? 'flex-row' : 'flex-col'} gap-\${spacing} \${className || ''}\`}>
    {children}
  </View>
);
const ListItem = ({ title, subtitle, leftIcon, className }: any) => (
  <View className={\`flex-row items-center p-4 border-b border-white/5 \${className || ''}\`}>
    {leftIcon && <Icon name={leftIcon} size={20} color="#06b6d4" className="mr-3" />}
    <View>
      <Text className="text-white font-medium">{title}</Text>
      {subtitle && <Text className="text-zinc-500 text-sm">{subtitle}</Text>}
    </View>
  </View>
);
const Icon = ({ name, size = 24, color = "white", className }: any) => {
  const LucideIcon = (icons as any)[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} className={className} />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black">
        <SafeAreaView className="flex-1">
          <StatusBar style="light" />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            ${renderNode(blueprint.root)}
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
`;
}
