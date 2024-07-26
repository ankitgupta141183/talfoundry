import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import TagsInput from "react-tagsinput";
import { GETTECHNOLOGIES } from "../../Actions/programManagerJobsActions";
// import TECHNOLOGIES from "../../constants/techs";

function states(tech) {

    return tech.map((a, index) => ({ abbr: index, name: a }));;
}


function TechnologiesAutoSuggestField(getprops) {
    const { handleChange, data, tagInputProps, jobCategory , onBlur=false } = getprops
    const [tech , setTech] = useState([])
    useEffect(() =>{
        GETTECHNOLOGIES().then(res => {
            if(res.skills){
                setTech(res.skills)
            }else{
                alert(res.message)
            }
        })
    }, [])


    function autocompleteRenderInput({ addTag, ...props }) {
        const handleOnChange = (e, { newValue, method }) => {
            console.log(newValue, "newValue", method, "method");
            if (method === "enter") {
                e.preventDefault()
            } else {
                props.onChange(e)
            }
        }

        const inputValue =
            (props.value && props.value.trim().toLowerCase()) || "";
        let suggestions = [];
        if (inputValue.length > 0) {
            let results = states(tech)?.filter((state) => {
                return state.name.name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase());
            });

            results.map((res) => {
                if (inputValue.split(" ").length === 1) {
                    if (res.name.name.toLowerCase().includes(inputValue)) {
                        suggestions.push(res);
                    }
                }

                if (inputValue.split(" ").length > 1) {
                    inputValue.split(" ").map((val) => {
                        if (res.name.name.toLowerCase().includes(val.toLowerCase())) {
                            suggestions.push(res);
                        }
                        return val
                    });
                }
                return res
            });
        }

        let suggestionsArray = [];
        for (let i = 0; i < jobCategory.length; i++) {
            suggestionsArray.push(
                suggestions.filter((sug) => sug.name.name.includes(jobCategory[i]))
            );
        }
        suggestionsArray = suggestionsArray.flat();

        return (
            <Autosuggest
                ref={props.ref}
                suggestions={suggestionsArray.filter(
                    (a, b) => suggestionsArray.indexOf(a) === b
                )}
                shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                getSuggestionValue={(suggestion) => suggestion.name.name}
                renderSuggestion={(suggestion) => <span>{suggestion.name.name}</span>}
                inputProps={{ ...props, onChange: handleOnChange }}
                onSuggestionSelected={(e, { suggestion }) => {
                    addTag(suggestion.name.name);
                }}
                onSuggestionsClearRequested={() => { }}
                onSuggestionsFetchRequested={() => { }}
            />
        );
    }

    return (
        <TagsInput
            renderInput={
                autocompleteRenderInput
            }
            inputProps={tagInputProps}
            addOnBlur={onBlur}
            value={data || []}
            onChange={
                handleChange
            }
        />
    )

}

export default TechnologiesAutoSuggestField