import React, { useState, useEffect, use } from 'react';
import style from './PopupWindow.module.css';

interface PopupWindowProps {
    messageDetail: string;
    onClose: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({ messageDetail, onClose }) => {
    const [activeTab, setActiveTab] = useState('tab1'); // Default to the first tab
    const [dataPoints, setDataPoints] = useState([]);
    const [thoughts, setThoughts] = useState<string>("");


    useEffect(() => {
        try {
            const detailObject = JSON.parse(JSON.stringify(messageDetail));
            const thoughts = detailObject.choices[0].context.thoughts;
            const points = detailObject.choices[0].context.data_points;
            setThoughts(thoughts);
            setDataPoints(points);

        } catch (error) {
            console.error("Error parsing messageDetail:", error);
            setDataPoints([]);
        }
    }, [messageDetail]);


    const renderDataPoints = () => {
        return dataPoints.map((point, index) => (
            <div key={index} className={style.card}>
                <div className={style.cardContent}>{point}</div>
            </div>
        ));
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // Render tab content conditionally based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tab1':
                return <div>{renderDataPoints()}</div>;
            case 'tab2':
                return <div dangerouslySetInnerHTML={{ __html: thoughts }} />;
            case 'tab3':
                return <div>Content for Tab 3</div>;
            default:
                return null;
        }
    };

    return (
        <div className={`${style.overlay} fixed inset-0 flex items-center justify-center z-50`}>
            <div className={`${style.popup} rounded-lg shadow-lg`}>
                <div className={style.tabs}>
                    <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? style.activeTab : ''}>
                        Supporting content
                    </button>
                    <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? style.activeTab : ''}>
                        Thought process
                    </button>
                    <button onClick={() => handleTabClick('tab3')} className={activeTab === 'tab3' ? style.activeTab : ''}>
                        Dummy
                    </button>
                </div>
                <div className={style.tabContent}>
                    {renderTabContent()}
                </div>
                <button className={`${style.closeButton} mt-4 px-4 py-2 rounded-md`} onClick={onClose}>
                    閉じる
                </button>
            </div>
        </div>
    );

};

export default PopupWindow;


