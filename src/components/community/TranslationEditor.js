/**
 * TranslationEditor Component
 * Edit and contribute translations
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LAYOUT } from '../../constants/layout';

const TranslationEditor = ({
  originalText = '',
  machineTranslation = '',
  currentTranslation = '',
  onSave,
  onCancel,
  isSubmitting = false,
}) => {
  const [translation, setTranslation] = useState(currentTranslation);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onSave?.({ translation, notes });
  };

  const handleUseMachine = () => {
    setTranslation(machineTranslation);
  };

  return (
    <View style={styles.container}>
      {/* Original Text */}
      <View style={styles.section}>
        <Text style={styles.label}>Original</Text>
        <View style={styles.originalCard}>
          <Text style={styles.originalText}>{originalText}</Text>
        </View>
      </View>

      {/* Machine Translation */}
      {machineTranslation && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Machine Translation</Text>
            <TouchableOpacity onPress={handleUseMachine}>
              <Text style={styles.useButton}>Use this</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.machineCard}>
            <Text style={styles.machineText}>{machineTranslation}</Text>
          </View>
        </View>
      )}

      {/* Translation Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Your Translation</Text>
        <TextInput
          style={styles.input}
          value={translation}
          onChangeText={setTranslation}
          placeholder="Enter your translation..."
          placeholderTextColor={COLORS.textTertiary}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Notes Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add context or cultural notes..."
          placeholderTextColor={COLORS.textTertiary}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSubmitting || !translation.trim()}
        >
          {isSubmitting ? (
            <Text style={styles.saveText}>Saving...</Text>
          ) : (
            <>
              <Ionicons name="checkmark" size={18} color={COLORS.white} />
              <Text style={styles.saveText}>Save</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: LAYOUT.spacing.base,
  },
  section: {
    marginBottom: LAYOUT.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.sm,
  },
  label: {
    fontSize: LAYOUT.fontSize.sm,
    fontWeight: LAYOUT.fontWeight.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: LAYOUT.spacing.sm,
  },
  useButton: {
    fontSize: LAYOUT.fontSize.sm,
    color: COLORS.primary,
    fontWeight: LAYOUT.fontWeight.medium,
  },
  originalCard: {
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
  },
  originalText: {
    fontSize: LAYOUT.fontSize.lg,
    color: COLORS.textPrimary,
    fontWeight: LAYOUT.fontWeight.medium,
  },
  machineCard: {
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
  },
  machineText: {
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.base,
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.textPrimary,
    minHeight: 100,
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  notesInput: {
    minHeight: 80,
    borderColor: COLORS.border,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: LAYOUT.spacing.lg,
  },
  cancelButton: {
    paddingHorizontal: LAYOUT.spacing.xl,
    paddingVertical: LAYOUT.spacing.md,
    marginRight: LAYOUT.spacing.md,
  },
  cancelText: {
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.textSecondary,
    fontWeight: LAYOUT.fontWeight.medium,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.xl,
    paddingVertical: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.lg,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveText: {
    fontSize: LAYOUT.fontSize.base,
    color: COLORS.white,
    fontWeight: LAYOUT.fontWeight.semibold,
    marginLeft: LAYOUT.spacing.xs,
  },
});

export default TranslationEditor;




