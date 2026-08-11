import { useState, useEffect } from 'react';
import { getEventSettings } from '../services/eventSettingsService';

export function useEventSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEventSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load event settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { settings, loading };
}