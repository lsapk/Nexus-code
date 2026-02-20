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
      "expo": "~52.0.0", // Switching to more realistic stable version for export
      "react": "18.3.1",
      "react-native": "0.76.5",
      "nativewind": "^4.1.23",
      "react-native-reanimated": "~3.16.1",
      "lucide-react-native": "^0.474.0",
      "expo-blur": "~14.0.1",
      "react-native-safe-area-context": "4.12.0",
      "react-native-screens": "~4.4.0"
    }
  }, null, 2));

  zip.file("App.tsx", generateAppCode(blueprint));
  zip.file("global.css", "@tailwind base;\n@tailwind components;\n@tailwind utilities;");
  zip.file("tailwind.config.js", "module.exports = { content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'], presets: [require('nativewind/preset')] };");
  zip.file("babel.config.js", "module.exports = function(api) { api.cache(true); return { presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'], plugins: ['react-native-reanimated/plugin'] }; };");

  // Generate the zip
  const content = await zip.generateAsync({ type: "base64" });
  const filename = `${FileSystem.documentDirectory}${blueprint.appName || 'project'}.zip`;

  await FileSystem.writeAsStringAsync(filename, content, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(filename);
}

function generateAppCode(blueprint: any) {
  const renderNode = (node: any): string => {
    if (!node) return '';
    const { type, props = {}, children, text } = node;
    const className = props.className ? ` className="${props.className}"` : '';

    // Simplified props conversion
    const otherProps = Object.keys(props)
      .filter(k => k !== 'className')
      .map(k => ` ${k}={${JSON.stringify(props[k])}}`)
      .join('');

    if (type === 'Text') {
      return `<Text${className}${otherProps}>${text || ''}</Text>`;
    }

    const childrenCode = Array.isArray(children)
      ? children.map(child => renderNode(child)).join('\n')
      : (children ? renderNode(children) : '');

    return `<${type}${className}${otherProps}>\n${childrenCode}\n</${type}>`;
  };

  return `
import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";

// Mock Components for Generated App
const GlassCard = ({ children, className }: any) => <View className={"bg-white/10 rounded-3xl border border-white/10 " + className}>{children}</View>;
const BlurButton = ({ children, className }: any) => <TouchableOpacity className={"bg-white/20 rounded-2xl py-3 px-6 " + className}>{children}</TouchableOpacity>;

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar style="light" />
        ${renderNode(blueprint.root)}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
`;
}
