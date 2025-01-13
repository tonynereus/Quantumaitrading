import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, Tag, message, Spin } from 'antd';
import PageTitle from '../components/PageTitle';
import AppContext from '../context/AppContext';
import apis from '../assets/apis';

const levels = [
    {
        id: 1,
        name: 'Tier 1',
        features: [
            'Feature 1: Access basic services',
            'Feature 2: Limited support',
        ],
    },
    {
        id: 2,
        name: 'Tier 2',
        features: [
            'Feature 1: Access all basic services',
            'Feature 2: Priority support',
            'Feature 3: Discounted transaction fees',
        ],
    },
    {
        id: 3,
        name: 'Tier 3',
        features: [
            'Feature 1: Access premium services',
            'Feature 2: 24/7 support',
            'Feature 3: Higher transaction limits',
        ],
    },
    {
        id: 4,
        name: 'Tier 4',
        features: [
            'Feature 1: Access all services',
            'Feature 2: Dedicated account manager',
            'Feature 3: Unlimited transaction limits',
        ],
    },
];

function UpgradeAccount() {
    const AppC = useContext(AppContext);
    const { myReq } = AppC;
    const userData = AppC.data;

    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (levelId) => {
        if (userData.level >= levelId) {
            return message.info('You are already on this level or higher.');
        }

        return message.info('Contact support to upgrade account');

        setLoading(true);
        try {
            const response = await myReq(apis.upgradeAccount, { level: levelId }, true);

            if (response.status) {
                message.success('Account upgraded successfully.');
                AppC.updateData({ ...userData, level: levelId }); // Update context with new level
            } else {
                throw new Error(response.message || 'Failed to upgrade account.');
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <PageTitle title="Upgrade Account" />
            </div>
            <Spin spinning={loading} size="large">
                <div className="d-flex flex-wrap justify-content-center">
                    {levels.map((level) => (
                        <Card
                            key={level.id}
                            className={`m-3 ${userData.level === level.id ? 'border-primary' : ''}`}
                            style={{ width: 300 }}
                            title={<h3>{level.name}</h3>}
                            extra={
                                <Tag color={userData.level === level.id ? 'green' : 'blue'}>
                                    {userData.level === level.id ? 'Current Level' : 'Upgrade Available'}
                                </Tag>
                            }
                        >
                            <ul>
                                {level.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <Button
                                type="primary"
                                disabled={userData.level >= level.id}
                                onClick={() => handleUpgrade(level.id)}
                                className="mt-3"
                            >
                                {userData.level >= level.id ? 'Already on this level' : 'Upgrade to this level'}
                            </Button>
                        </Card>
                    ))}
                </div>
            </Spin>
        </div>
    );
}

export default UpgradeAccount;
