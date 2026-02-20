import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { Icon } from '../components/Icon';
import { useNexusStore } from '../store/useNexusStore';
import { t } from '../constants/i18n';
import { MotiView } from 'moti';

export default function SettingsScreen({ onClose }: { onClose: () => void }) {
  const { language, setLanguage, reset } = useNexusStore();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 bg-black/90 p-6 pt-20"
    >
      <View className="flex-row justify-between items-center mb-10">
        <Text className="text-white text-3xl font-bold">{t('settings', language)}</Text>
        <TouchableOpacity onPress={onClose} className="p-2 bg-zinc-800 rounded-full">
          <Icon name="X" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView className="space-y-6">
        <GlassCard className="p-6">
          <Text className="text-zinc-400 mb-4 font-medium uppercase text-xs tracking-widest">{t('language', language)}</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={() => setLanguage('fr')}
              className={`flex-1 p-4 rounded-2xl border ${language === 'fr' ? 'border-primary bg-primary/10' : 'border-white/10'}`}
            >
              <Text className="text-white text-center font-bold">Français</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage('en')}
              className={`flex-1 p-4 rounded-2xl border ${language === 'en' ? 'border-primary bg-primary/10' : 'border-white/10'}`}
            >
              <Text className="text-white text-center font-bold">English</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <TouchableOpacity
          onPress={() => {
            reset();
            onClose();
          }}
          className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-red-500 font-bold">Réinitialiser tout</Text>
            <Icon name="Trash2" color="#ef4444" size={20} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </MotiView>
  );
}
