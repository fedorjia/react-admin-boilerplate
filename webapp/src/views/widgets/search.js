import { Component, PropTypes } from 'react';
import Select from 'react-select';
import { load } from '../../actions/tableview';
import common from '../../commons/common';
import http from '../../utils/http';

class Search extends Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		url: PropTypes.string.isRequired,
		pageSize: PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			callback: null
		};
	}

	render() {
		const cmp = this.renderItems(this.state.items);
		return (
			<div className="modal fade search-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
				<div className="modal-dialog modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="exampleModalLabel">Search</h4>
						</div>

						<div className="modal-body">
							<form>
								{ cmp }
							</form>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-default" onClick={ this.onReset.bind(this) }>Reset</button>
							<button type="button" className="btn btn-primary" onClick={ this.onSearch.bind(this) }>Search</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderItems(items) {
		let key = 0;
		return (
			items.map((item) => {
				let el;
				switch(item.type) {
				case 'date':
					el = (
						<div key={ key } className="form-group">
							<label className="control-label">{ item.label }</label>
							<div className="input-append">
								<input type="text" name={ item.name } ref={ item.name } className="datetime-picker form-control" placeholder=""/>
							</div>
						</div>
					);
					break;

				case 'dateinterval':
					if(!item.name) {
						item.name = '';
					}
					el = (
						<div key={ key } className="form-group">
							<label className="control-label">{ item.label }</label>
							<div>
								<span className="input-append interval floatleft">
									<input type="text" name={ `${item.name}From` } ref={ `${item.name}From` } className="form-control datetime-picker" placeholder=""/>
								</span>
								<span className="to-text">&nbsp;~</span>
								<span className="input-append interval floatright">
									<input type="text" name={ `${item.name}To` } ref={ `${item.name}To` } className="form-control datetime-picker" placeholder=""/>
								</span>
							</div>
							<div className="clear"></div>
						</div>
					);
					break;

				case 'select':
					el = (
						<div key={ key } className="form-group">
							<label className="control-label ">{ item.label }</label>
							<select name={ item.name } ref={ item.name } className="form-control options">
								<option key="all" value="all">全部</option>
								{ item.data.map((option) => <option key={ option.value } value={ option.value }>{ option.text }</option>) }
							</select>
						</div>
					);
					break;

                case 'combo':{
                    const comboKey = `combo_${key}`;
                    const comboValue = this.state[comboKey];
                    el = (
                        <div key={ key } className="form-group">
                            <label className="control-label ">{ item.label }</label>
                            <Select labelKey="name" valueKey="id" options={ item.data }
                                    ref={ item.name } name={ item.name } value={ comboValue }
                                    searchable={ true } clearable={ false }
                                    onChange={ this.onChangeCombo.bind(this, comboKey) }
                                    placeholder={`请选择${item.label}`}/>
                        </div>
                    );
                    break;
                }

                case 'combo_async': {
                    const comboKey = `combo_async_${key}`;
                    const comboValue = this.state[comboKey];
                    el = (
                        <div key={ key } className="form-group">
                            <label className="control-label ">{ item.label }</label>
                            <Select.Async labelKey="name" valueKey="id" loadOptions={ this.loadComboAsync.bind(this, item.url) }
                                          ref={ item.name } name={ item.name } value={ comboValue }
                                          searchable={ true } clearable={ false }
                                          onChange={ this.onChangeCombo.bind(this, comboKey) }
                                          placeholder={`请选择${item.label}`}/>
                        </div>
                    );
                    break;
                }

				default:
					el = (
						<div key={ key } className="form-group">
							<label className="control-label">{ item.label }</label>
							<input type={ item.type } className="form-control" name={ item.name } ref={ item.name } />
						</div>
					);
				}

				key++;
				return el;
			})
		);
	}

    loadComboAsync(url) {
        return http.get(url)
            .then((resp) => {
                if(resp.success) {
                    const options = resp.result.items.map((item) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    });
                    return {
                        options: options
                    };
                }
            });
    }

	/***
	 * show
	 */
	show(options) {
		this.setState(options);
		$('.search-modal').modal({
			backdrop: 'static',
			keyboard: false
		});

		setTimeout(() => {
			const datetimeOptions = {
				format: 'yyyy-mm-dd',
				todayBtn: true,
				autoclose: true,
				minView: 2,
				language: 'zh-CN'
			};
			$('.search-modal .datetime-picker').datetimepicker(datetimeOptions);
			$('.search-modal .datetime-picker').datetimepicker(datetimeOptions);
		}, 500);
	}

	/***
	 * hide
	 */
	hide() {
		$('.search-modal').modal('hide');
	}

	onReset() {
		$('.search-modal input').val(null);
		$('.search-modal select').val('all');

        // combo & combo_async
        for(let name in this.refs) {
            if (this.refs.hasOwnProperty(name)) {
                if(!this.refs[name].value) {
                    let refs = this.refs[name].refs;
                    if(refs) {
                        let ref = this.refs[name];
                        if(!ref.setValue) {
                            ref = ref.refs.select;
                        }
                        if(ref) {
                            ref.setValue(null);
                        }
                    }
                }
            }
        }
	}

    onChangeCombo(comboKey, val) {
        const obj = {};
        obj[comboKey] = val;
        this.setState(obj);
    }

	onSearch() {
		this.hide();
		let queryParams = { };
		for(let name in this.refs) {
			if(this.refs.hasOwnProperty(name)) {
				if(this.refs[name].value) {
                    if($(this.refs[name]).hasClass('options')) {
                        if(this.refs[name].value != 'all'){
                            queryParams[name] = this.refs[name].value;
                        }
                    } else {
                        queryParams[name] = this.refs[name].value;
                    }
				} else {
                    // combo & combo_async
                    let refs = this.refs[name].refs;
                    if(refs) {
                        let obj = refs.value;
                        if(obj) {
                            queryParams[obj.name] = obj.defaultValue;
                        } else {
                            obj = refs.select.refs.value;
                            if(obj) {
                                queryParams[obj.name] = obj.defaultValue;
                            }
                        }
                    }
                }
			}
		}
		// dispatch fetch action 
		this.props.dispatch(load(__id(this.props), this.props.url, queryParams, 1, this.props.pageSize));
		
        // store filter state
		common.setFilterState(location.pathname, queryParams);

		// callback
		if(this.state.callback) {
			this.state.callback(queryParams);
		}
	}
}

function __id(props) {
	let id = props.id;
	if (!id) {
		id = props.url;
	}
	return id;
}

export default Search;
