import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Visualizer } from '../components/Visualizer';
import { Icon } from '../components/Icon';
import { GlassCard } from '../components/GlassCard';
import { useNexusStore } from '../store/useNexusStore';
import { generateBlueprint } from '../services/gemini';
import { MotiView, AnimatePresence } from 'moti';
import { t } from '../constants/i18n';
import SettingsScreen from './SettingsScreen';
import { exportProject } from '../services/export';

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
      // Build history for Gemini
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
    <View className="flex-1 bg-black">
      {/* Preview Area */}
      <View className="flex-1">
        {currentBlueprint ? (
          <Visualizer node={currentBlueprint.root} />
        ) : (
          <View className="flex-1 items-center justify-center p-10">
            <Icon name="Sparkles" size={64} color="#007AFF" />
            <MotiView
              from={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 200 }}
              className="items-center"
            >
              <Text className="text-white text-3xl font-bold text-center mt-6">
                {t('welcome', language)}
              </Text>
              <Text className="text-zinc-500 text-center mt-2">
                {t('tagline', language)}
              </Text>
            </MotiView>
          </View>
        )}
      </View>

      {/* Controls */}
      <View className="absolute top-12 left-6 right-6 flex-row justify-between items-center z-10">
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={undo} className="p-2 bg-black/50 rounded-full border border-white/10">
            <Icon name="Undo2" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={redo} className="p-2 bg-black/50 rounded-full border border-white/10">
            <Icon name="Redo2" size={20} />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity onPress={() => setShowSettings(true)} className="p-2 bg-black/50 rounded-full border border-white/10">
            <Icon name="Settings" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => currentBlueprint && exportProject(currentBlueprint)}
            className="px-4 py-2 bg-primary rounded-full"
          >
            <Icon name="Download" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Overlay */}
      <AnimatePresence>
        {showSettings && (
          <View className="absolute inset-0 z-50">
            <SettingsScreen onClose={() => setShowSettings(false)} />
          </View>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <GlassCard intensity={40} className="flex-row items-center p-2 pr-4">
          <TextInput
            className="flex-1 text-white px-4 py-2"
            placeholder={t('start_chat', language)}
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={loading}
            className={`p-2 rounded-xl ${loading ? 'bg-zinc-800' : 'bg-white'}`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Icon name="ArrowUp" size={20} color="black" />
            )}
          </TouchableOpacity>
        </GlassCard>
      </KeyboardAvoidingView>
    </View>
  );
}
