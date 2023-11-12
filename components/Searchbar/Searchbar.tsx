import React, { useState } from 'react';
import styles from './SearchComponent.module.css';
import { RetrievalMode } from '../../pages/api/models2'

interface Props {
    promptTemplate: string;
    setPromptTemplate: React.Dispatch<React.SetStateAction<string>>;
    retrieveCount: number;
    setRetrieveCount: React.Dispatch<React.SetStateAction<number>>;
    excludeCategory: string;
    setExcludeCategory: React.Dispatch<React.SetStateAction<string>>;
    useSemanticRanker: boolean;
    setUseSemanticRanker: React.Dispatch<React.SetStateAction<boolean>>;
    useSemanticCaptions: boolean;
    setUseSemanticCaptions: React.Dispatch<React.SetStateAction<boolean>>;
    retrievalMode: RetrievalMode;
    setRetrievalMode: React.Dispatch<React.SetStateAction<RetrievalMode>>;
}

const SearchComponent = ({
    promptTemplate,
    setPromptTemplate,
    retrieveCount,
    setRetrieveCount,
    excludeCategory,
    setExcludeCategory,
    useSemanticRanker,
    setUseSemanticRanker,
    useSemanticCaptions,
    setUseSemanticCaptions,
    retrievalMode,
    setRetrievalMode,
}: Props) => {

    const handleIncrement = () => {
        setRetrieveCount((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setRetrieveCount((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    };

    const onPromptTemplateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        console.log(newValue);
        setPromptTemplate(newValue);
    };

    const onRetrieveCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setRetrieveCount(parseInt(newValue || "3"));
    };

    const onExcludeCategoryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setExcludeCategory(newValue || "");
    };

    const onUseSemanticRankerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setUseSemanticRanker(!!isChecked);
    };

    const onUseSemanticCaptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setUseSemanticCaptions(isChecked);
    };

    const onRetrievalModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value as RetrievalMode;
        setRetrievalMode(newValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label htmlFor="overrideTemplate" className={styles.label}>Override prompt template</label>
                <textarea id="overrideTemplate" className={styles.input} onChange={onPromptTemplateChange} defaultValue={"promptTemplate"} />
            </div>

            <label htmlFor="searchResults" className={styles.label}>Retrieve this many search results:</label>
            <div className={styles.spinnerContainer}>
                <input type="text" className={styles.spinnerInput} value={retrieveCount} readOnly onChange={onRetrieveCountChange} />
                <div className={styles.spinnerButtons}>
                    <button onClick={handleIncrement} className={styles.spinnerButton}>▲</button>
                    <button onClick={handleDecrement} className={styles.spinnerButton}>▼</button>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="excludeCategory" className={styles.label}>Exclude category</label>
                <input id="excludeCategory" type="text" className={styles.input} onChange={onExcludeCategoryChanged} />
            </div>

            <div className={styles.checkboxGroup}>
                <label>
                    <input type="checkbox" checked={useSemanticRanker} className={styles.checkbox} onChange={onUseSemanticRankerChange} />
                    Use semantic ranker for retrieval
                </label>
            </div>

            <div className={styles.checkboxGroup}>
                <label>
                    <input type="checkbox" className={styles.checkbox} onChange={onUseSemanticCaptionsChange} />
                    Use query-contextual summaries instead of whole documents
                </label>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="retrievalMode" className={styles.label}>Retrieval mode *</label>
                <select id="retrievalMode" className={styles.input} onChange={onRetrievalModeChange}>
                    <option value="hybrid">Vectors + Text (Hybrid)</option>
                    <option value="vectors">Vectors</option>
                    <option value="text">Vectors</option>
                </select>
            </div>
        </div>
    );
};

export default SearchComponent;
