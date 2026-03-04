import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Space } from 'antd';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  return (
    <Space direction="horizontal">
      <Select
        defaultValue={i18n.language}
        style={{ width: 120 }}
        onChange={handleLanguageChange}
        options={[
          {
            value: 'zh-CN',
            label: '中文'
          },
          {
            value: 'en-US',
            label: 'English'
          }
        ]}
      />
    </Space>
  );
};

export default LanguageSwitcher;