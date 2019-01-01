 
 
using System;
using System.IO;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NHLStats.Api.Models;

namespace NHLStats.Api.Controllers
{
    [Route("[controller]")] 
    public class GraphQLController : Controller
    {
        private readonly IDocumentExecuter _documentExecuter;
        private readonly ISchema _schema;
        private readonly ILogger _logger;

        public GraphQLController(
            ISchema schema, 
            IDocumentExecuter documentExecuter,
            ILogger<GraphQLController> logger)
        {
            _schema = schema;
            _documentExecuter = documentExecuter;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            _logger.LogInformation("Server pinged on http port.");
            return Ok("server is alive");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GraphQLQuery query)
        {         
            if (query == null) {
                _logger.LogError("GraphQLController Post() called. Data IS NULL." + DateTime.Now);
                throw new ArgumentNullException(nameof(query));
            }

            _logger.LogWarning("GraphQLController Post() called. Data: " + query.Query.ToString() + " DateTime: " + DateTime.Now);

            var inputs = query.Variables.ToInputs();
            var executionOptions = new ExecutionOptions
            {
                Schema = _schema,
                Query = query.Query,
                Inputs = inputs
            };

            var result = await _documentExecuter.ExecuteAsync(executionOptions).ConfigureAwait(false);

            if (result.Errors?.Count > 0)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
