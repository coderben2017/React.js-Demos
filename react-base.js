/* follow ruanyf */

// 组件Ajax
var Component7 = React.createClass({
	getInitialState: function(){
		return {
			userName: "Ben",
			url: ""
		};
	},
	componentDidMount: function(){
		$.get( this.props.source, {
			url: this.props.source
		}, function( response ){
			if( this.isMounted() ){
				this.setState({
					userName: this.state.userName,
					url: response
				});
			}
		}.bind( this ) );
	},
	render: function(){
		return (
			<div>
				<p>用户名：{ this.state.userName }</p>
				<p><a href={ this.state.url }>{ this.state.url }</a></p>
			</div>
		);
	}
});

ReactDOM.render(
	<Component7 source="server.php" />
	,
	document.getElementById('container')
);


// 组件生命周期
// componentWillMount / componentDidMount 挂载
// componentWillUpdate(nextProps, nextState) / componentDidUpdate(nextProps, nextState)  重新渲染
// componentWillUnmount 解挂载
// componentWillReceiveProps(nextProps)  已加载组件收到新的参数
// shouldComponentUpdate(nextProps, nextState)  判断是否重新渲染
var Component6 = React.createClass({
	getInitialState: function(){
		return {
			opacity: 1.0
		};
	},
	componentDidMount: function(){
		this.timer = setInterval( function(){
			var opa = this.state.opacity;
			opa -= .05;
			if( opa < 0.1 ){
				opa = 1.0;
			}
			this.setState({
				opacity: opa
			});
		}.bind( this ), 100 );
	},
	render: function(){
		return (
			<div>
				<input type="text" style={{ opacity: this.state.opacity }} />
			</div>
		);
	}
});

ReactDOM.render(
	<Component6 />
	,
	document.getElementById('container')
);


// 读取form(input)、textarea、select、radio元素数据 —— event.target.value
var Component5 = React.createClass({
	getInitialState: function(){
		return {
			val : "hello"
		};
	},
	handleClick: function( event ){
		this.setState({
			val: event.target.value //注意此处获取数据方式
		});
	},
	render: function(){
		return (
			<div>
				<input type="text" onClick={ this.handleClick } />&nbsp;
				<p> { this.state.val } </p>
			</div>
		);
	}
});


ReactDOM.render(
	<Component5 />
	,
	document.getElementById('container')
);


// React状态机 —— this.state
var Component4 = React.createClass({
	getInitialState: function(){
		return {
			liked: false
		};
	},
	handleClick: function( event ){
		this.setState({
			liked: !this.state.liked
		});
	},
	render: function(){
		return (
			<div>
				<input type="text" value={ this.state.liked } readOnly="readOnly" />
				<button onClick={ this.handleClick }> toggle state </button>
			</div>
		);
	}
});

ReactDOM.render(
	<Component4 />
	,
	document.getElementById("container")
);


// React ref属性 —— 定位真实DOM节点（组件是虚拟的DOM节点，在渲染时转化成真实节点以提高页面速度）
var Component3 = React.createClass({
	handleClick: function(){
		this.refs.info.focus();
	},
	render: function(){
		return (
			<div>
				<input type="text" ref="info"/>&nbsp;
				<input type="button" value="focus input" onClick={ this.handleClick }/>
			</div>
		);
	}
});

ReactDOM.render(
	<Component3 />
	,
	document.getElementById("container")
);

// 验证组件实例的属性 —— React.propTypes API
var Component2 = React.createClass({
	getDefaultProps: function(){//设置默认属性值
		return {
			title: "true"
		};
	},
	propTypes: {//规定支撑类型
		title: React.PropTypes.string.isRequired
	},
	render: function(){
		return (
			<h1>{ this.props.title }</h1>
		);
	}
});

var t1 = "1";
var t2 = 1;

ReactDOM.render(
	<Component2 />
	,
	document.getElementById('container')
);


React.Children API（遍历节点）
var Component1 = React.createClass({
	render: function(){
		return (
			<div>
				{ 
					React.Children.map( this.props.children , function( child ){
						return <li>{ child }</li>;
					} ) 
				}
			</div>
		);
	}
});

ReactDOM.render(
	<Component1>
		<span>span1</span>
		<span>span2</span>
	</Component1>
	,
	document.getElementById('container')
);


/* 菜鸟教程 */

// React 表单
// var Input = React.createClass({
//   getInitialState: function(){
//     return {
//       value: "hello"
//     };
//   },

//   handleChange: function( event ){
//     this.setState({
//       value: event.target.value
//     });
//   },

//   render: function(){
//     return (
//       <div>
//         <input type="text" value={ this.state.value } onChange={ this.handleChange } /><br />
//         <p>{ this.state.value }</p>
//       </div>
//     );
//   }
// });

// ReactDOM.render(
//   <Input />
//   ,
//   document.getElementById("container")
// );


////React Ajax ( use jQuery )
//var UserGist = React.createClass({
//  getInitialState: function(){
//    return {
//      userName: "",
//      lastGistUrl: ""
//    };
//  },
//
//  componentDidMount: function(){
//    this.serverRequest = $.get( this.props.source, function( result ){
//      var lastGist = result[0];
//      this.setState({
//        userName: lastGist.owner.login,
//        lastGistUrl: lastGist.html_url
//      });
//    }.bind( this ) );
//  },
//
//  componentWillUnmount: function(){
//    this.serverRequest.abort();
//  },
//
//  render: function(){
//    return (
//      <div>
//        { this.state.userName } 用户最新的Gist共享地址：<br />
//        <a href={ this.state.lastGistUrl }>{ this.state.lastGistUrl }</a>
//      </div>
//    );
//  }
//});
//
//ReactDOM.render(
//  <UserGist source="https://api.github.com/users/octocat/gists" />
//  ,
//  document.getElementById("container")
//);


////！！！重要！！！——组件嵌套演示组件生命周期各个过程
//var Button = React.createClass({
//  getInitialState: function(){
//    return {
//      data: 1
//    };
//  },
//
//  setNewData: function() {
//    this.setState({
//      data: this.state.data + 1
//    });
//  },
//
//  render: function(){
//    return (
//      <div>
//        <button onClick={ this.setNewData }> Increase </button>
//        <Content theData={ this.state.data } ></Content>
//      </div>
//    );
//  }
//});
//
//var Content = React.createClass({
//  componentWillMount: function(){
//    console.log( "component will mount!" );
//  },
//  componentDidMount: function(){
//    console.log( "component did mount!" );
//  },
//  componentWillReceiveProps: function( newProps ){
//    console.log( "component will receive props! " + newProps );
//  },
//  shouldComponentUpdate: function( newProps, newState ){
//    console.log( "should component update! " + newProps + " " + newState );
//    return true;
//  },
//  componentWillUpdate: function( newProps, newState  ){
//    console.log( "component will update! " + newProps + " " + newState );
//  },
//  componentDidUpdate: function( prevProps, prevState ){
//    console.log( "component did update! " + prevProps + " " + prevState );
//  },
//  componentWillUnmount: function(){
//    console.log( "component will unmount!" );
//  },
//
//  render: function(){
//    return (
//      <p>{ this.props.theData }</p>
//    );
//  }
//});
//
//ReactDOM.render(
//  <Button />
//  ,
//  document.getElementById("container")
//);


////组件生命周期--componentDidMount方法
//var Component1 = React.createClass({
//  getInitialState: function(){
//    return {
//      opacity: 1.0
//    };
//  },
//
//  componentDidMount: function(){
//    this.timer = setInterval( function(){
//        var opacity = this.state.opacity;
//        opacity -= .05;
//        if( opacity < 0.1 ){
//          opacity = 1.0;
//        }
//        this.setState({
//          opacity: opacity
//        });
//      }.bind(this), 100 );
//  },
//
//  render: function(){
//    return (
//      <div style={ { opacity: this.state.opacity } }> { this.props.name } </div>
//    );
//  }
//});
//
//ReactDOM.render(
//  <Component1 name="me" />
//  ,
//  document.getElementById("container")
//);


//var ClickCounter = React.createClass(
//  {
//    getInitialState: function(){
//      return {
//        clickCount: 0
//      };
//    },
//    handleClick: function(){
//      this.setState( function(){
//        return { clickCount: this.state.clickCount + 1 }
//      } );
//    },
//    render: function(){
//      return (
//        <div>
//          <p onClick={ this.handleClick }>{ this.state.clickCount }</p>
//        </div>
//      );
//    }
//  }
//);
//
//ReactDOM.render(
//  <ClickCounter />
//  ,
//  document.getElementById("container")
//);


//var WebSite = React.createClass(
//  {
//    getInitialState: function(){
//      return {
//        name: "Ben's Blog",
//        address: "http://www.iambenben.com"
//      };
//    },
//    render: function(){
//      return (
//        <div>
//          <Name name={ this.state.name } />
//          <Site address={ this.state.address } />
//        </div>
//      );
//    }
//  }
//);
//
//var Name = React.createClass(
//  {
//    render: function(){
//      return (
//        <h3>{ this.props.name }</h3>
//      );
//    }
//  }
//);
//
//var Site = React.createClass(
//  {
//    render: function(){
//      return (
//        <a href={ this.props.address }> { this.props.address } </a>
//      );
//    }
//  }
//);
//
//ReactDOM.render(
//  <WebSite />
//  ,
//  document.getElementById("container")
//);

//var LikeButton = React.createClass(
//  {
//    getInitialState: function(){ //init state
//      return { liked: false };
//    },
//    clickHandle: function(){ //set state
//      this.setState({ liked: !this.state.liked });
//    },
//    render: function(){ //use the state
//      var text = this.state.liked ? "喜欢": "不喜欢";
//      return (
//        <div onClick = { this.clickHandle }> 你 { text } 我 ？ </div>
//      );
//    }
//  }
//);
//
//ReactDOM.render(
//  <LikeButton />
//  ,
//  document.getElementById("container")
//);

//var Component1 = React.createClass(
//  {
//    render: function(){
//      return (
//        <div>
//          <Name name = { this.props.name } />
//          <Link href = { this.props.href } />
//        </div>
//      );
//    }
//  }
//);
//
//var Name = React.createClass(
//  {
//    render: function(){
//      return (
//        <a>{ this.props.name }</a>
//      );
//    }
//  }
//);
//
//var Link = React.createClass(
//  {
//    render: function(){
//      return (
//        <a>{ this.props.href }</a>
//      );
//    }
//  }
//);
//
//ReactDOM.render(
//  <Component1 name="Ben" href="http://www.iambenben.com" />
//  ,
//  document.getElementById("container")
//);


//var MyComponent = React.createClass(
//    {
//      render: function(){
//        return (
//          <ol>
//          {
//            React.Children.map( this.props.children, function( children ){
//              return <li>{children}</li>;
//            } )
//          }
//          </ol>
//        );
//      }
//    }
//);
//
//ReactDOM.render(
//  <MyComponent>
//     <p>111</p>
//     <p>222</p>
//  </MyComponent>
//  ,
//  document.getElementById("container")
//);

//var myStyle = {
//  fontSize: 50,
//  color: "#00f",
//  textAlign: "center"
//};
//
//ReactDOM.render(
//		<ul>
//			<h1>test</h1>
//			<p style={myStyle} >demo{
//          ( parseInt("10",7) == 7 ) ? "777" : "No"
//          }</p>
//			<p data-myattribute="somevalue">lalalalala</p>
//		</ul>
//		,
//    document.getElementById("container")
//);

/*var arr = [
	<h1>lalala</h1>,
	<h2>hahaha</h2>
];
var arr = [
	<h5>lalala</h5>,
	<h6>hahaha</h6>
];
ReactDOM.render(
	<div>{arr[1]}</div>,
	document.getElementById("container")
);*/

//4 component
/*var HelloMessage = React.createClass({
	render: function(){
		return <p><strong>hello {this.props.name}</strong></p>;
	}
});
ReactDOM.render(
	<HelloMessage name="Nike" />,
	document.getElementById("container")
);*/

//5 this.props.children
/*var NoteList = React.createClass({
	render: function(){
		return (
			<ol>
			{
				React.Children.map( this.props.children, function( children ){
					return <li>{children}</li>;
				} )
			}
			</ol>
		);
	}
});

ReactDOM.render(
	<NoteList>
		<span>1111</span>
		<span>2222</span>
	</NoteList>,
	document.getElementById("container")
);*/

