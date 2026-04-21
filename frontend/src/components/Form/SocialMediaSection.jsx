import React from 'react';

const SocialMediaSection = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube', 'TikTok'];

  const togglePlatform = (platform) => {
    const current = data.activePlatforms || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    setData(prev => ({ ...prev, activePlatforms: updated }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Social Media</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label-text">Active Platforms</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  data.activePlatforms?.includes(platform)
                    ? 'bg-primary-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="label-text">Posting Frequency</label>
            <select
              name="postingFrequency"
              value={data.postingFrequency}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="label-text">Engagement Level</label>
            <select
              name="engagementLevel"
              value={data.engagementLevel}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Level</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
