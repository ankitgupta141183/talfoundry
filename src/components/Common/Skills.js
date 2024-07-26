import React, { Component } from "react";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import $ from "jquery";


export default class Skills extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showMore: false,
      href: false,
      wordCount: false,
      cursorDisabled: false,
      gridWords: false,
      skills: '',
      displayCount:this.props.displayCoun
    }
  }
  componentDidMount(){
    this.setState({
      href: (typeof this.props.href !== 'undefined') ? this.props.href : false,
      wordCount: (typeof this.props.wordCount !== 'undefined') ? this.props.wordCount : false,
      cursorDisabled: (typeof this.props.cursorDisabled !== 'undefined') ? this.props.cursorDisabled : false,
      gridWords: (typeof this.props.gridWords !== 'undefined') ? this.props.gridWords : false,
    });
    
    const expertiseUpperCase = this.props.skill.length > 0 ? this.props.skill.map(item => item.toLocaleUpperCase()) : []
    const skill = this.props.skill.length > 0 ?  this.props.skill.filter((item , index) => expertiseUpperCase.indexOf(item.toLocaleUpperCase()) === index) : []
    this.returnSkill(skill, this.props.to, this.props.displayCount, (typeof this.props.wordCount !== 'undefined') ? this.props.wordCount : false ,(typeof this.props.cursorDisabled !== 'undefined') ? this.props.cursorDisabled : false ,(typeof this.props.gridWords !== 'undefined') ? this.props.gridWords : false )
  }
  componentDidUpdate(prevProps){
    const SkillChange = JSON.stringify(this.props.skill) === JSON.stringify(prevProps.skill);
    if(this.props.displayCount !== prevProps.displayCount || !SkillChange){
    
      const expertiseUpperCase = this.props.skill.length > 0 ? this.props.skill.map(item => item.toLocaleUpperCase()) : []
      const skill = this.props.skill.length > 0 ?  this.props.skill.filter((item , index) => expertiseUpperCase.indexOf(item.toLocaleUpperCase()) === index) : []  
    this.returnSkill(skill , this.props.to, this.props.displayCount, (typeof this.props.wordCount !== 'undefined') ? this.props.wordCount : false ,(typeof this.props.cursorDisabled !== 'undefined') ? this.props.cursorDisabled : false ,(typeof this.props.gridWords !== 'undefined') ? this.props.gridWords : false )
    }
  }
  showMoreF(index){
    if(!this.state.wordCount){
      $(`#skillL-${this.props.id}-${index}`).css({"borderRadius": "30px 30px 30px 30px", "marginRight": "10px" });
      $(`#skill-${this.props.id}-${index}`).hide();

      this.setState({showMore: true})
      this.props.skill.map((item, index) => {
        if (index > this.props.displayCount - 1 ) {
          this.state.skills.push(
            <span
              className=""
              title={item}
              style={{
                fontSize:"14px",
                fontWeight:"400",
                margin:"3px",
                padding: "4px 15px 4px 15px",
                background: "#b6e4f5",
                border:"0px",
                color: "black",
                borderRadius: "30px",
                width:"auto",
                textTransform:"capitalize",
                fontFamily:"sans-serif",
                display:"inline-block",
              }}
            >
              {item}
            </span>
          );
        }
        return item
      })
    }
  }

  returnSkill = (skill, to, displayCount, wordCount, cursorDisabled, gridWords) => {
    // console.log("index--",gridWords)
    let skills = [];
    if (
      !isEmpty(skill) &&
      skill.length > 0
    ) {
      let skillsArray = [];
      if (skill.length > displayCount) {
        skillsArray = skill.slice(0, displayCount);
      } else {
        skillsArray = skill;
      }
      skillsArray.map((item, index) => {
        if (index === displayCount - 1 && skill.length > displayCount) {
          skills.push(
            <React.Fragment>
              <div className="d-inline-flex" key={index}>
              <span
                id={`skillL-${this.props.id}-${index}`}
                title={item}
                style={{
                  fontSize:"14px",
                  fontWeight:"400",
                  margin:"3px 0px 3px 3px",
                  padding: "4px 15px 4px 15px",
                  background: "#b6e4f5",
                  border:"0px",
                  color: "black",
                  borderRadius: "30px 0px 0px 30px",
                  width:"auto",
                  textTransform:"capitalize",
                  fontFamily:"sans-serif",
                  display:"inline-block"
                }}
                key={index}
              >
               { wordCount ?
                 item.length > 18  ? `${item.substring(0, 18)}..` : item
                 :
                 gridWords ? item.length > 20  ? `${item.substring(0, 20)}..` : item : item
               }
              </span>

              <span
                id={`skill-${this.props.id}-${index}`}
                style={{
                  fontSize:"14px",
                  fontWeight:"400",
                  margin:"3px 3px 3px 0px",
                  padding: "4px 15px 4px 15px",
                  background: "#0DA4DE",
                  border:"0px",
                  color: "black",
                  borderRadius: "0px 30px 30px 0px",
                  width:"auto",
                  textTransform:"capitalize",
                  fontFamily:"sans-serif",
                  display:"inline-block",
                }}
                key={index}
              >
              {(typeof this.props.href !== 'undefined') ?
                <Link
                  to={to}
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    cursor: wordCount ? "default":"default"
                  }}
                >
                  {" "}
                  +{skill.length - displayCount}{" "}
                </Link>
                :
                <span
                  onClick={(cursorDisabled) ? '' :this.showMoreF.bind(this,index)}
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    cursor: (!cursorDisabled) ? (wordCount) ? "default" : "pointer" : "default"
                  }}
                >
                  {" "}
                  +{skill.length - displayCount}{" "}
                </span>
              }
              </span>
            </div>

            </React.Fragment>
          );
        } else {
          skills.push(
            <span
              className=""
              title={item}
              style={{
                fontSize:"14px",
                fontWeight:"400",
                margin:"3px",
                padding: "4px 15px 4px 15px",
                background: "#b6e4f5",
                border:"0px",
                color: "black",
                borderRadius: "30px",
                width:"auto",
                textTransform:"capitalize",
                fontFamily:"sans-serif",
                display:"inline-block",
              }}
              key={index}
            >
              {gridWords ? item.length > 20  ? `${item.substring(0, 20)}..` : item : item}
            </span>
          );
        }
        return item
      });
    }
    this.setState({skills: skills})
  }



  render() {
    // console.log(this.props.skill, "skill",this.props.to,"to" ,this.props.displayCount, "display");

    // console.log("index",this.state.wordCount)
    return (
        this.state.skills
    );
  }
}


