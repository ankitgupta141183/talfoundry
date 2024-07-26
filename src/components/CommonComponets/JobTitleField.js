import React, { useState } from "react"
import Autosuggest from "react-autosuggest";
import JOBTITLES from "../../constants/titles";

const jobTitles = JOBTITLES;
const getTitleSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
        return [];
    } else {
        let kok = [];
        jobTitles.map((lang) => {
            if (
                lang.toLowerCase().includes(value.toLowerCase()) &&
                value.split(" ").length === 1
            ) {
                if (value.length > 1) {
                    kok.push(lang);
                }
            } else if (value.split(" ").length > 1) {
                value.split(" ").map((val) => {
                    if (lang.toLowerCase().includes(val.toLowerCase())) {
                        if (val.length > 1) {
                            kok.push(lang);
                        }
                    }
                    return val
                });
            }
            return lang
        });

        return kok;
    }
}

function JobTitlesField(props) {
    const { OnEnterByJobTitle, titleInputProps, titleError,  fieldError , handleTitleChange  } = props;

    const [state, setState] = useState({
        suggestions: [],
        titleError: titleError
    })

    const onTitleSuggestionsFetchRequested = ({ value }) => {
        let tempSuggestions = getTitleSuggestions(value).filter(
            (a, b) => getTitleSuggestions(value).indexOf(a) === b
        )
        const DataFilter = tempSuggestions.filter(val => val.toLowerCase().includes(value.trim().toLowerCase()))
        setState({
            suggestions: DataFilter,
            titleError: false,
        })
    }

    const onTitleSuggestionsClearRequested = () => {
        setState({
            suggestions: [],
            titleError: false,
        })
    }


    const getTitleJobSuggestionValue = (suggestion) => {
        const label = suggestion
        handleTitleChange(label)
        setState({...state, titleError: false })
        return suggestion
    }
    const renderTitleJobSuggestion = (suggestion) => <div>{suggestion}</div>;

    return (
        <>
            <div className="tf_search search_user_for_chating">
                <form
                    onSubmit={
                        OnEnterByJobTitle
                    }
                >
                    <Autosuggest
                        suggestions={state.suggestions}
                        onSuggestionsFetchRequested={onTitleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onTitleSuggestionsClearRequested}
                        getSuggestionValue={getTitleJobSuggestionValue}
                        renderSuggestion={renderTitleJobSuggestion}
                        inputProps={titleInputProps}
                    />
                </form>
            </div>
            <br />
            <br />
            {titleError &&
                fieldError(
                    "Please enter at least 15 characters"
                )}
        </>
    )
}

export default JobTitlesField 