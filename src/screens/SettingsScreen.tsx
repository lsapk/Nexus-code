import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { Icon } from '../components/Icon';
import { useNexusStore } from '../store/useNexusStore';
import { t } from '../constants/i18n';
import { styled } from '../lib/styled';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SettingsScreen({ onClose }: { onClose: () => void }) {
  const { language, setLanguage, reset } = useNexusStore();

  return (
    <StyledView className="flex-1 bg-black/90 p-6 pt-20">
      <StyledView className="flex-row justify-between items-center mb-10">
        <StyledText className="text-white text-3xl font-bold">{t('settings', language)}</StyledText>
        <StyledTouchableOpacity onPress={onClose} className="p-2 bg-zinc-800 rounded-full">
          <Icon name="X" size={24} />
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView className="space-y-6">
        <GlassCard className="p-6">
          <StyledText className="text-zinc-400 mb-4 font-medium uppercase text-xs tracking-widest">{t('language', language)}</StyledText>
          <StyledView className="flex-row gap-4">
            <StyledTouchableOpacity
              onPress={() => setLanguage('fr')}
              className={`flex-1 p-4 rounded-2xl border ${language === 'fr' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10'}`}
            >
              <StyledText className="text-white text-center font-bold">Français</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => setLanguage('en')}
              className={`flex-1 p-4 rounded-2xl border ${language === 'en' ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/10'}`}
            >
              <StyledText className="text-white text-center font-bold">English</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </GlassCard>

        <StyledTouchableOpacity
          onPress={() => {
            reset();
            onClose();
          }}
          className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20"
        >
          <StyledView className="flex-row items-center justify-between">
            <StyledText className="text-red-500 font-bold">Réinitialiser tout</StyledText>
            <Icon name="Trash2" color="#ef4444" size={20} />
          </StyledView>
        </StyledTouchableOpacity>
      </StyledScrollView>
    </StyledView>
  );
}
