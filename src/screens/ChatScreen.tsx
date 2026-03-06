import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Visualizer } from '../components/Visualizer';
import { Icon } from '../components/Icon';
import { GlassCard } from '../components/GlassCard';
import { useNexusStore } from '../store/useNexusStore';
import { generateBlueprint } from '../services/gemini';
import { t } from '../constants/i18n';
import SettingsScreen from './SettingsScreen';
import { exportProject } from '../services/export';
import { styled } from '../lib/styled';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { blueprints, currentBlueprintIndex, addBlueprint, undo, redo, language } = useNexusStore();
  const currentBlueprint = blueprints[currentBlueprintIndex];

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      const history = blueprints.map(b => ({
        role: "model",
        parts: [{ text: JSON.stringify(b) }]
      }));

      const nextBlueprint = await generateBlueprint(userMessage, history);
      if (nextBlueprint) {
        addBlueprint(nextBlueprint);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 bg-black">
      {/* Visualizer Area */}
      <StyledView className="flex-1">
        {currentBlueprint ? (
          <Visualizer node={currentBlueprint.root} />
        ) : (
          <StyledView className="flex-1 items-center justify-center p-8">
            <StyledView className="p-4 border border-cyan-500/30 rounded-full bg-cyan-500/10 mb-8">
              <Icon name="Terminal" size={48} color="#06b6d4" />
            </StyledView>
            <StyledView className="items-center">
              <StyledText className="text-cyan-400 text-3xl font-bold tracking-tight text-center">
                {t('welcome', language).toUpperCase()}
              </StyledText>
              <StyledText className="text-zinc-500 font-mono text-center mt-4">
                {"> "} {t('tagline', language)}
              </StyledText>
              <StyledView className="flex-row items-center mt-2">
                <StyledView className="w-2 h-4 bg-cyan-500" />
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      </StyledView>

      {/* Floating Controls */}
      <StyledView className="absolute top-4 left-6 right-6 flex-row justify-between items-center z-10">
        <StyledView className="flex-row gap-2">
          <StyledTouchableOpacity
            onPress={undo}
            className="p-3 bg-zinc-900/80 rounded-full border border-zinc-800"
          >
            <Icon name="Undo2" size={18} color="#06b6d4" />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={redo}
            className="p-3 bg-zinc-900/80 rounded-full border border-zinc-800"
          >
            <Icon name="Redo2" size={18} color="#06b6d4" />
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex-row gap-2">
          <StyledTouchableOpacity
            onPress={() => setShowSettings(true)}
            className="p-3 bg-zinc-900/80 rounded-full border border-zinc-800"
          >
            <Icon name="Cpu" size={18} color="#06b6d4" />
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            onPress={() => currentBlueprint && exportProject(currentBlueprint)}
            className="px-5 py-3 bg-cyan-600 rounded-full flex-row items-center"
          >
            <Icon name="Share2" size={18} color="white" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* Settings Overlay */}
      {showSettings && (
        <StyledView className="absolute inset-0 z-50">
          <SettingsScreen onClose={() => setShowSettings(false)} />
        </StyledView>
      )}

      {/* Chat Terminal Input */}
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="p-6 pb-10"
      >
        <GlassCard intensity={15} className="flex-row items-center p-2 border border-zinc-800">
          <StyledView className="pl-4 pr-2">
            <StyledText className="text-cyan-500 font-mono font-bold">$</StyledText>
          </StyledView>
          <StyledTextInput
            className="flex-1 text-white px-2 py-3 font-mono"
            placeholder={t('start_chat', language)}
            placeholderTextColor="#4b5563"
            value={input}
            onChangeText={setInput}
          />
          <StyledTouchableOpacity
            onPress={handleSend}
            disabled={loading}
            className={`p-3 rounded-xl ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#06b6d4" />
            ) : (
              <Icon name="ArrowRight" size={20} color="#06b6d4" />
            )}
          </StyledTouchableOpacity>
        </GlassCard>
      </StyledKeyboardAvoidingView>
    </StyledView>
  );
}
