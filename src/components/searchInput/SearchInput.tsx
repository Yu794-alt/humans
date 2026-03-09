import React, {ChangeEvent, memo, useEffect, useState} from 'react'

import './styles.css';
import {UserSuggestion} from "../../types/types";

interface SearchInputProps {
    value?: string;
    onChange?: (query: string) => void;
    onClick?: (query: string) => void;
    onItemClick?: (query: string) => void;
    suggestions: UserSuggestion[];
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = memo(({
                                                         value: externalValue,
                                                         onChange,
                                                         onClick,
                                                         placeholder = 'Looking for somebody',
                                                         suggestions,
                                                         onItemClick
                                                     }) => {

    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [value, setValue] = useState<string>( '');

    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    useEffect(() => {
        setShowSuggestions(suggestions.length > 0);
    }, [suggestions]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    const handleItemClick = (text: string) => {
        setValue(text);
        setShowSuggestions(false);
        onItemClick?.(text);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setShowSuggestions(false);
        }
    };

    return (
        <div className={'search-container'} onBlur={handleBlur}>
            <div className={'search-input-wrapper'}>
                <input
                    placeholder={placeholder}
                    onChange={handleChange}
                    className="search-input"
                    value={value}
                />
                {onClick &&
                    <button onClick={() => onClick(value)} className="search-button">search</button>}
            </div>
            {showSuggestions && <ul className="suggestions-list" onMouseDown={(e) => e.preventDefault()}>
                {suggestions.map((suggestion) => (
                    <li
                        key={suggestion.id}
                        className={'suggestion-item'}
                        tabIndex={-1}
                        onClick={() => handleItemClick(`${suggestion.firstName}`)}
                    >
                        <span>{suggestion.firstName} {suggestion.lastName}</span>&nbsp;
                        <span className={'suggestion-item-email'}>{suggestion.email}</span>
                    </li>
                ))}
            </ul>
            }
        </div>
    )
})
SearchInput.displayName = 'SearchInput';

export default SearchInput
